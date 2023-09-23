import { NextResponse } from "next/server";

import { db } from "@/lib/database/db";
import { fetchRedis } from "@/utils/fetchRedis";
import { fetchServerSession } from "@/utils/serverInteractions";

export async function POST(req: Request) {
  const session = await fetchServerSession();

  // is user authenticated
  if (!session) {
    return NextResponse.json(
      { message: "شما دسترسی به این عملیات را ندارید", error: true },
      { status: 401 }
    );
  }

  const body: {
    statusText: string;
  } = await req.json();
  const { statusText } = body;

  // is the provided status text valid
  if (statusText.trim().length > 100 || statusText.trim().length === 0) {
    return NextResponse.json(
      { message: " متن پیام وارد شده معتبر نیست", error: true },
      { status: 400 }
    );
  }

  let isAlreadyInExplorer: 0 | 1;

  try {
    isAlreadyInExplorer = await fetchRedis<0 | 1>(
      "hexists",
      "explorer:explorer_list",
      session.user.id
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "خطا در برقراری ارتباط با سرور",
        source: "add-to-explorer: isAlreadyInExplorer",
        error: true,
      },
      {
        status: 500,
      }
    );
  }
  // Has the user been added already
  if (isAlreadyInExplorer) {
    return NextResponse.json(
      {
        message: "شما قبلا در لیست اکسپلورر قرار گرفته اید",
        error: true,
      },
      {
        status: 400,
      }
    );
  }

  const userId = session.user.id;

  await db.hset("explorer:explorer_list", {
    [userId]: statusText,
  });

  return NextResponse.json(
    {
      message: "شما با موفقیت در لیست اکسپلورر قرار گرفتید",
      error: false,
    },
    {
      status: 200,
    }
  );
}
