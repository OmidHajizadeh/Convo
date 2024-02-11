import { fetchServerSession } from "@/utils/serverInteractions";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/database/db";

export async function POST(req: NextRequest) {
  const session = await fetchServerSession();
  // is user authorized
  if (!session) {
    return NextResponse.json(
      { message: "شما دسترسی به این عملیات را ندارید", error: true },
      { status: 401 }
    );
  }

  const body = await req.json();

  try {
    await db.zadd(`push-subscriber:${session.user.id}`, {
      score: Date.now(),
      member: JSON.stringify(body),
    });

    return NextResponse.json(
      {
        message: "Subscription successfully stored on the server",
        error: false,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error", error: true },
      { status: 500 }
    );
  }
}
