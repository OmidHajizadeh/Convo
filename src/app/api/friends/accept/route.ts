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

  let hasFriendRequest: 0 | 1;

  try {
    hasFriendRequest = await fetchRedis<0 | 1>(
      "sismember",
      `user:${session.user.id}:incoming_friend_requests`,
      senderId
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "خطا در برقراری ارتباط با سرور",
        error: true,
        source: "accept: hasFriendRequest",
      },
      { status: 500 }
    );
  }

  // has a friend request
  if (!hasFriendRequest) {
    return NextResponse.json(
      { message: "درخواست دوستی پیدا نشد", error: true },
      { status: 400 }
    );
  }

  let areAlreadyFriends: 0 | 1;

  try {
    areAlreadyFriends = await fetchRedis<0 | 1>(
      "sismember",
      `user:${session.user.id}:friends`,
      senderId
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "خطا در برقراری ارتباط با سرور",
        error: true,
        source: "accept: areAlreadyFriends",
      },
      { status: 500 }
    );
  }

  // are already friends
  if (areAlreadyFriends) {
    return NextResponse.json(
      { message: "کاربر مورد نظر در لیست دوستان شما میباشد", error: true },
      { status: 400 }
    );
  }

  try {
    await Promise.all([
      db.sadd(`user:${session.user.id}:friends`, senderId),
      db.sadd(`user:${senderId}:friends`, session.user.id),
      db.srem(`user:${session.user.id}:incoming_friend_requests`, senderId),
    ]);
  } catch (error) {
    return NextResponse.json(
      {
        message: "خطا در برقراری ارتباط با سرور",
        error: true,
        source: "accept: responsing to friend request",
      },
      { status: 500 }
    );
  }

  let friendString: string;

  try {
    friendString = await fetchRedis<string>("get", `user:${senderId}`);
  } catch (error) {
    return NextResponse.json(
      {
        message: "خطا در برقراری ارتباط با سرور",
        error: true,
        source: "accept: retreiving friend info",
      },
      { status: 500 }
    );
  }

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
