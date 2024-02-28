import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/database/db";
import { fetchRedis } from "@/utils/fetchRedis";
import {
  fetchServerSession,
  pushMessageToUser,
} from "@/utils/serverInteractions";
import { pusherServer } from "@/lib/pusher/pusher";
import { toPusherKey } from "@/utils/helpers";
import { PushMessage } from "@/lib/Models/PushMessage";

type ResponseBodyType = {
  chatId: string;
  message: Message;
};

export async function POST(req: NextRequest) {
  const session = await fetchServerSession();

  const body = await req.json();
  const { chatId, message }: ResponseBodyType = body;
  const [userId1, userId2] = chatId.split("--");

  delete message["status"];

  // is user authorized
  if (
    !session ||
    (session.user.id !== userId1 && session.user.id !== userId2)
  ) {
    return NextResponse.json(
      { message: "شما دسترسی به این عملیات را ندارید", error: true },
      { status: 401 }
    );
  }

  // is message is not empty
  if (!message.text || message.text.trim().length === 0) {
    return NextResponse.json(
      { message: "متن پیام نمیتواند خالی باشد", error: true },
      { status: 422 }
    );
  }

  // is message is not too long
  if (message.text.trim().length > 500) {
    return NextResponse.json(
      { message: "متن پیام نمیتواند بیشتر از 500 کارکتر باشد", error: true },
      { status: 422 }
    );
  }

  const friendId = session.user.id === userId1 ? userId2 : userId1;
  const friendsList = await fetchRedis<string[]>(
    "smembers",
    `user:${session.user.id}:friends`
  );

  // is user authorized
  if (!friendsList.includes(friendId)) {
    if (
      !session ||
      (session.user.id !== userId1 && session.user.id !== userId2)
    ) {
      return NextResponse.json(
        { message: "شما دسترسی به این عملیات را ندارید", error: true },
        { status: 401 }
      );
    }
  }

  try {
    await db.zadd(`chat:${chatId}:messages`, {
      score: message.timestamp,
      member: JSON.stringify({
        ...message,
      }),
    });

    try {
      await pusherServer.trigger(
        toPusherKey(`chat:${friendId}:new-message`),
        "incoming_message",
        {
          sender: session.user,
          message,
          chatId,
        }
      );
    } catch (error) {
      console.warn("[WEBSOCKET] Sending New Message", error);
    }

    try {
      const friendSubscriptions = await fetchRedis<string[]>(
        "zrange",
        `push-subscriber:${friendId}`,
        0,
        -1
      );

      if (friendSubscriptions) {
        const subObjects = friendSubscriptions.map((sub) => JSON.parse(sub));

        const pushMessage: PushMessage = {
          title: session.user.name,
          body: message.text,
          tag: "new-message",
          image: session.user.image,
          url: process.env.SITE_URL + "/chat/" + chatId,
        };

        await pushMessageToUser(subObjects, pushMessage);
      }
    } catch (error) {
      console.warn("[PUSH MESSAGE] Sending New Message", error);
    }

    return NextResponse.json(
      { message: "پیام با موفقیت ارسال شد", error: false },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "خطایی در برقراری ارتباط با سرور اتفاق افتاد", error: true },
      { status: 500 }
    );
  }
}
