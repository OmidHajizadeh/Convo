import webPush from "web-push";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/database/db";
import { pusherServer } from "@/lib/pusher/pusher";
import { toPusherKey } from "@/utils/helpers";
import { fetchServerSession } from "@/utils/serverInteractions";
import { fetchRedis } from "@/utils/fetchRedis";

export async function POST(req: NextRequest) {
  const session = await fetchServerSession();

  // is user authenticated
  if (!session) {
    return NextResponse.json(
      { message: "شما دسترسی به این عملیات را ندارید", error: true },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { id: senderId } = body;

  // is the provided ID a valid email address
  if (typeof senderId !== "string") {
    return NextResponse.json(
      { message: "آی دی وارد شده معتبر نیست", error: true },
      { status: 400 }
    );
  }

  try {
    const updateDatabase = db.srem(
      `user:${session.user.id}:incoming_friend_requests`,
      senderId
    );

    const triggerDenyRequest = pusherServer.trigger(
      toPusherKey(`user:${senderId}:friend_request_response`),
      "friend_request_response",
      JSON.stringify({
        user: session.user,
        state: "denied",
      })
    );

    await Promise.all([updateDatabase, triggerDenyRequest]);

    const friendSubscriptions = await fetchRedis<string[]>(
      "zrange",
      `push-subscriber:${senderId}`,
      0,
      -1
    );

    if (friendSubscriptions) {
      const subObjects = friendSubscriptions.map((sub) => JSON.parse(sub));

      const pushMessage: PushMessage = {
        title: "رد درخواست دوستی",
        body: `از طرف ${session.user.name}`,
        image: session.user.image,
        tag: "system-notification",
        url: process.env.SITE_URL + "/chat/friends-list",
      };

      subObjects.forEach((subObject) => {
        webPush.setVapidDetails(
          process.env.MAILTO_ADDRESS_PUSH as string,
          process.env.NEXT_PUBLIC_PUBLIC_VAPID_KEY as string,
          process.env.PRIVATE_VAPID_KEY as string
        );

        webPush
          .sendNotification(subObject, JSON.stringify(pushMessage))
          .catch((err) => {
            console.log(err);
          });
      });
    }

    return NextResponse.json(
      { message: "درخواست کاربر برای دوستی با شما رد شد", error: false },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "خطا در برقراری ارتباط با سرور",
        error: true,
        source: "deny: removing friend request",
      },
      { status: 500 }
    );
  }
}
