import { notFound } from "next/navigation";

import { ChildrenProp } from "@/lib/Models/ChildrenProp";
import ReduxProvider from "@/store/Redux/ReduxProvider";
import { fetchRedis } from "@/utils/fetchRedis";
import {
  fetchServerSession,
  getFriendsByUserId,
} from "@/utils/serverInteractions";
import NewFriendRequestsSubscriber from "@/utils/subscribers/NewFriendRequestsSubscriber";
import ResponsiveChatSidebar from "@/components/ResponsiveChatSidebar";
import HeadUser from "@/components/HeadUser";
import FriendsChatSubscriber from "@/utils/subscribers/FriendsChatSubscriber";
import ExplorerStatus from "@/utils/subscribers/ExplorerStatus";
import { Friend } from "@/lib/Models/Friend";

const ChatListLayout = async ({ children }: ChildrenProp) => {
  const session = await fetchServerSession();

  if (!session) notFound();

  let incomingFriendRequests: User[];
  let isAlreadyInExplorer: 0 | 1;

  let friends: Friend[];

  try {
    const incommingFriendRequestIds = await fetchRedis<string[]>(
      "smembers",
      `user:${session.user.id}:incoming_friend_requests`
    );

    let incomingFriendRequestsString = await Promise.all(
      incommingFriendRequestIds.map((senderId) =>
        fetchRedis<string>("get", `user:${senderId}`)
      )
    );

    incomingFriendRequests = incomingFriendRequestsString.map(
      (friend) => JSON.parse(friend) as User
    );

    friends = await getFriendsByUserId(session.user.id);

    isAlreadyInExplorer = await fetchRedis<0 | 1>(
      "hexists",
      "explorer:explorer_list",
      session.user.id
    );
  } catch (error) {
    notFound();
  }

  return (
    <div className="h-screen grid place-items-center bg-landing-wave-lines bg-fixed bg-cover bg-no-repeat bg-center">
      <section className="convo backdrop-blur-sm bg-slate-50/50 flex xl:container w-full relative shadow-lg xl:rounded-2xl overflow-hidden h-screen xl:h-[50rem] max-h-screen">
        <ReduxProvider>
          <NewFriendRequestsSubscriber
            initialFriendRequestList={incomingFriendRequests}
            sessionId={session.user.id}
          />
          <FriendsChatSubscriber
            initialFriends={friends}
            sessionId={session.user.id}
          />
          <ExplorerStatus isAlreadyInExplorer={!!isAlreadyInExplorer} />
          <ResponsiveChatSidebar userHead={<HeadUser session={session} />}>
            {children}
          </ResponsiveChatSidebar>
        </ReduxProvider>
      </section>
    </div>
  );
};

export default ChatListLayout;
