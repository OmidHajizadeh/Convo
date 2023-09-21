import { NextResponse } from "next/server";

import { db } from "@/lib/database/db";
import { fetchServerSession } from "@/utils/serverInteractions";
import { fetchRedis } from "@/utils/fetchRedis";
import { pusherServer } from "@/lib/pusher/pusher";
import { toPusherKey } from "@/utils/helpers";

export async function POST(req: Request) {
  const session = await fetchServerSession();

  // is user authenticated
  if (!session) {
    return NextResponse.json(
      { message: "شما دسترسی به این عملیات را ندارید", error: true },
      { status: 401 }
    );
  }

  const body = await req.json();
  const friendId: string = body;

  // is there a coresponsing email in our database
  if (!friendId) {
    return NextResponse.json(
      { message: "کاربر مورد نظر در این پلتفرم ثبت نشده است", error: true },
      { status: 422 }
    );
  }

  let areAlreadyFriends: 0 | 1;

  try {
    areAlreadyFriends = await fetchRedis<0 | 1>(
      "sismember",
      `user:${session.user.id}:friends`,
      friendId
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "خطا در برقراری ارتباط با سرور",
        error: true,
        source: "add: areAlreadyFriends",
      },
      { status: 500 }
    );
  }

  // are already friends
  if (!areAlreadyFriends) {
    return NextResponse.json(
      { message: "کاربر مورد نظر در لیست دوستان شما نمیباشد", error: true },
      { status: 400 }
    );
  }

  try {
    await db.sadd(`user:${session.user.id}:block_list`, friendId);

    await pusherServer.trigger(
      toPusherKey(`user:${friendId}:blocked`),
      "blocked_by_user",
      JSON.stringify(session.user)
    );

    return NextResponse.json(
      {
        message: "کاربر مورد نظر بلاک شد",
        error: false,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "خطا در برقراری ارتباط با سرور",
        error: true,
        source: "add: adding to block list",
      },
      { status: 500 }
    );
  }
}
