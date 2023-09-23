import { NextResponse } from "next/server";

import { db } from "@/lib/database/db";
import { fetchRedis } from "@/utils/fetchRedis";
import { fetchServerSession } from "@/utils/serverInteractions";

export async function GET() {
  const session = await fetchServerSession();

  // is user authenticated
  if (!session) {
    return NextResponse.json(
      { message: "شما دسترسی به این عملیات را ندارید", error: true },
      { status: 401 }
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
        source: "remove-from-explorer: isAlreadyInExplorer",
        error: true,
      },
      {
        status: 500,
      }
    );
  }

  // Has the user been deleted already
  if (!isAlreadyInExplorer) {
    return NextResponse.json(
      {
        message: "شما در لیست اکسپلورر قرار ندارید",
        error: true,
      },
      {
        status: 400,
      }
    );
  }

  try {
    await db.hdel("explorer:explorer_list", session.user.id);
  } catch (error) {
    return NextResponse.json(
      {
        message: "خطا در برقراری ارتباط با سرور",
        source: "remove-from-explorer: deleting user",
        error: true,
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json(
    {
      message: "شما با موفقیت از لیست اکسپلورر حذف شدید",
      error: false,
    },
    {
      status: 200,
    }
  );
}
