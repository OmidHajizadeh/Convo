import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/database/db";
import { fetchRedis } from "@/utils/fetchRedis";
import { fetchServerSession } from "@/utils/serverInteractions";
import { pusherServer } from "@/lib/pusher/pusher";
import { toPusherKey } from "@/utils/helpers";

export async function POST(req: NextRequest) {
  const session = await fetchServerSession();

  const body = await req.json();
  const { chatId, message }: { chatId: string; message: Message } = body;
  const [userId1, userId2] = chatId.split("--");

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
    const addMessageToDatabase = db.zadd(`chat:${chatId}:messages`, {
      score: message.timestamp,
      member: JSON.stringify(message),
    });

    const triggerSuccessMessage = pusherServer.trigger(
      toPusherKey(`chat:${friendId}:new-message`),
      "incoming_message",
      {
        sender: session.user,
        message,
        chatId,
      }
    );

    await Promise.all([addMessageToDatabase, triggerSuccessMessage]);

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
