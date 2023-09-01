import { notFound } from "next/navigation";

import { ChildrenProp } from "@/lib/Models/ChildrenProp";
import ReduxProvider from "@/store/Redux/ReduxProvider";
import { fetchRedis } from "@/utils/fetchRedis";
import {
  fetchServerSession,
  getChatMessages,
  getFriendsByUserId,
} from "@/utils/serverInteractions";
import NewFriendRequestsSubscriber from "@/utils/subscribers/NewFriendRequestsSubscriber";
import ResponsiveChatSidebar from "@/components/ResponsiveChatSidebar";
import HeadUser from "@/components/HeadUser";
import UserOptions from "@/components/UserOptions";
import FriendsChatSubscriber from "@/utils/subscribers/FriendsChatSubscriber";
import ExplorerStatus from "@/utils/subscribers/ExplorerStatus";

const ChatListLayout = async ({ children }: ChildrenProp) => {
  const session = await fetchServerSession();

  if (!session) notFound();

  const incommingFriendRequestIds = await fetchRedis<string[]>(
    "smembers",
    `user:${session.user.id}:incoming_friend_requests`
  );

  const incomingFriendRequests: User[] = await Promise.all(
    incommingFriendRequestIds.map(async (senderId) => {
      const sender = await fetchRedis<string>("get", `user:${senderId}`);
      return JSON.parse(sender);
    })
  );

  const isAlreadyInExplorer = await fetchRedis<0 | 1>(
    "hexists",
    "explorer:explorer_list",
    session.user.id
  );

  const friends = await getFriendsByUserId(session.user.id);

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
          <ExplorerStatus
            isAlreadyInExplorer={!!isAlreadyInExplorer}
          />
          <ResponsiveChatSidebar
            userHead={<HeadUser session={session} />}
          >
            {children}
          </ResponsiveChatSidebar>
        </ReduxProvider>
      </section>
    </div>
  );
};

export default ChatListLayout;
