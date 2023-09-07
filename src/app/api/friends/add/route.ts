import { NextResponse } from "next/server";

import { db } from "@/lib/database/db";
import { fetchServerSession } from "@/utils/serverInteractions";
import { fetchRedis } from "@/utils/fetchRedis";
import { emailRegEx } from "@/utils/globalConst";
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
  const { email } = body;

  // is the provided email a valid email address
  if (!emailRegEx.test(email)) {
    return NextResponse.json(
      { message: "ایمیل وارد شده معتبر نیست", error: true },
      { status: 400 }
    );
  }

  let friendId: string;

  try {
    friendId = await fetchRedis<string>("get", `user:email:${email}`);
  } catch (error) {
    return NextResponse.json(
      {
        message: "خطا در برقراری ارتباط با سرور",
        error: true,
        source: "add: retreiving friend ID",
      },
      { status: 500 }
    );
  }

  // is there a coresponsing email in our database
  if (!friendId) {
    return NextResponse.json(
      { message: "کاربر مورد نظر در این پلتفرم ثبت نشده است", error: true },
      { status: 422 }
    );
  }

  // is our user trying to add themselves as friend
  if (friendId === session.user.id) {
    return NextResponse.json(
      { message: "نمیتوانید خودتان را بعنوان دوست اضافه کنید", error: true },
      { status: 400 }
    );
  }

  let isAlreadyAFriend: 0 | 1;

  try {
    isAlreadyAFriend = await fetchRedis<0 | 1>(
      "sismember",
      `user:${friendId}:incoming_friend_requests`,
      session.user.id
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "خطا در برقراری ارتباط با سرور",
        error: true,
        source: "add: isAlreadyAFriend",
      },
      { status: 500 }
    );
  }

  // has already send a request
  if (isAlreadyAFriend) {
    return NextResponse.json(
      { message: "قبلا درخواست برای این کاربر فرستاده اید", error: true },
      { status: 400 }
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
  if (areAlreadyFriends) {
    return NextResponse.json(
      { message: "کاربر مورد نظر در لیست دوستان شما میباشد", error: true },
      { status: 400 }
    );
  }

  try {
    await db.sadd(`user:${friendId}:incoming_friend_requests`, session.user.id);
  } catch (error) {
    return NextResponse.json(
      {
        message: "خطا در برقراری ارتباط با سرور",
        error: true,
        source: "add: adding to friend requests",
      },
      { status: 500 }
    );
  }

  try {
    const friendPromise = fetchRedis<string>("get", `user:${friendId}`);

    const triggerSuccessRequest = pusherServer.trigger(
      toPusherKey(`user:${friendId}:incoming_friend_requests`),
      "incoming_friend_requests",
      JSON.stringify(session.user)
    );

    const [friendString] = await Promise.all([
      friendPromise,
      triggerSuccessRequest,
    ]);

    return NextResponse.json(
      {
        message: "درخواست با موفقیت فرستاده شد",
        error: false,
        friend: friendString,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "خطا در برقراری ارتباط با سرور",
        error: true,
        source: "add: friendAsString",
      },
      { status: 500 }
    );
  }
}
