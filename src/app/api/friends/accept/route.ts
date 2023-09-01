import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/database/db";
import { fetchServerSession } from "@/utils/serverInteractions";
import { fetchRedis } from "@/utils/fetchRedis";
import { pusherServer } from "@/lib/pusher/pusher";
import { toPusherKey } from "@/utils/helpers";

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

  const hasFriendRequest = await fetchRedis<0 | 1>(
    "sismember",
    `user:${session.user.id}:incoming_friend_requests`,
    senderId
  );

  // has a friend request
  if (!hasFriendRequest) {
    return NextResponse.json(
      { message: "درخواست دوستی پیدا نشد", error: true },
      { status: 400 }
    );
  }

  const areAlreadyFriends = await fetchRedis<0 | 1>(
    "sismember",
    `user:${session.user.id}:friends`,
    senderId
  );

  // are already friends
  if (areAlreadyFriends) {
    return NextResponse.json(
      { message: "کاربر مورد نظر در لیست دوستان شما میباشد", error: true },
      { status: 400 }
    );
  }

  await db.sadd(`user:${session.user.id}:friends`, senderId);
  await db.sadd(`user:${senderId}:friends`, session.user.id);
  // await db.srem(`user:${senderId}:outbound_friend_requests`, session.user.id);
  await db.srem(`user:${session.user.id}:incoming_friend_requests`, senderId);

  const friendString = await fetchRedis<string>("get", `user:${senderId}`);

  pusherServer.trigger(
    toPusherKey(`user:${senderId}:friend_request_response`),
    "friend_request_response",
    JSON.stringify({
      user: session.user,
      state: "accepted",
    })
  );

  return NextResponse.json(
    {
      message: "کاربر در لیست دوستان شما قرار گرفت ",
      error: false,
      friendString,
    },
    { status: 200 }
  );
}
