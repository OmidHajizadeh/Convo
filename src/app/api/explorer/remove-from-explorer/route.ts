import { db } from "@/lib/database/db";
import { fetchRedis } from "@/utils/fetchRedis";
import { fetchServerSession } from "@/utils/serverInteractions";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await fetchServerSession();

  // is user authenticated
  if (!session) {
    return NextResponse.json(
      { message: "شما دسترسی به این عملیات را ندارید", error: true },
      { status: 401 }
    );
  }

  const isAlreadyInExplorer = await fetchRedis<0 | 1>(
    "hexists",
    "explorer:explorer_list",
    session.user.id
  );

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

  await db.hdel("explorer:explorer_list", session.user.id);

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
