import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/database/db";
import { pusherServer } from "@/lib/pusher/pusher";
import { toPusherKey } from "@/utils/helpers";
import { fetchServerSession } from "@/utils/serverInteractions";

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
