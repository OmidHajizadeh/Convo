import { authOptions } from "@/lib/auth/auth-options";
import { getServerSession } from "next-auth";
import webPush from "web-push";
import { notFound } from "next/navigation";

import { fetchRedis } from "./fetchRedis";
import { chatHrefConstructor } from "./helpers";
import { Friend } from "@/lib/Models/Friend";

export async function fetchServerSession() {
  const session = (await getServerSession(authOptions)) as Session;

  return session;
}

export async function getChatMessages(chatId: string) {
  try {
    const results: string[] = await fetchRedis(
      "zrange",
      `chat:${chatId}:messages`,
      0,
      -1
    );
    const dbMessages = results.map((message) => {
      return JSON.parse(message) as Message;
    });

    const reversedDbMessages = dbMessages.reverse();

    return reversedDbMessages;
  } catch (error) {
    notFound();
  }
}

export async function getFriendsByUserId(userId: string) {
  const friendIds = await fetchRedis<string[]>(
    "smembers",
    `user:${userId}:friends`
  );

  const friends = await Promise.all(
    friendIds.map(async (friendId) => {
      const chatId = chatHrefConstructor(userId, friendId);

      const [userString, messages] = await Promise.all([
        fetchRedis<string>("get", `user:${friendId}`),
        getChatMessages(chatId),
      ]);

      const user = JSON.parse(userString) as User;
      return {
        friend: user,
        messages: messages || [],
      } as Friend;
    })
  );

  return friends;
}

export async function pushMessageToUser(
  subObjects: any[],
  pushMessage: PushMessage
) {
  for (let i = 0; i < subObjects.length; i++) {
    webPush.setVapidDetails(
      process.env.MAILTO_ADDRESS_PUSH as string,
      process.env.NEXT_PUBLIC_PUBLIC_VAPID_KEY as string,
      process.env.PRIVATE_VAPID_KEY as string
    );

    await webPush.sendNotification(subObjects[i], JSON.stringify(pushMessage));
  }
}
