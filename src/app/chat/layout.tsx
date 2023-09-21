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
import OnlineMembersSubscriber from "@/utils/subscribers/OnlineMembersSubscriber";
import BlockedUsersSubscriber from "@/utils/subscribers/BlockedUsersSubscriber";

const ChatListLayout = async ({ children }: ChildrenProp) => {
  const session = await fetchServerSession();

  if (!session) notFound();

  let incomingFriendRequests: User[];
  let isAlreadyInExplorer: 0 | 1;

  let friends: Friend[];
  let blockedFriendIds: string[] = [];
  let blockedByFriendIds: string[] = [];

  try {
    const incommingFriendRequestIds = await fetchRedis<string[]>(
      "smembers",
      `user:${session.user.id}:incoming_friend_requests`
    );

    const incomingFriendRequestStrings = await Promise.all(
      incommingFriendRequestIds.map(async (senderId) => {
        return fetchRedis<string>("get", `user:${senderId}`);
      })
    );

    incomingFriendRequests = incomingFriendRequestStrings.map((request) =>
      JSON.parse(request)
    );

    const isAlreadyInExplorerReq = fetchRedis<0 | 1>(
      "hexists",
      "explorer:explorer_list",
      session.user.id
    );
    const blockedFriendsIdReq = fetchRedis<string[]>(
      "smembers",
      `user:${session.user.id}:block_list`
    );
    const friendsReq = getFriendsByUserId(session.user.id);

    const [isAlreadyInExplorerRes, blockedFriendsIdRes, friendsRes] =
      await Promise.all([
        isAlreadyInExplorerReq,
        blockedFriendsIdReq,
        friendsReq,
      ]);

    const blockedByFriendIdsReq = await Promise.all(
      friendsRes.map((friendObj) => {
        return fetchRedis<0 | 1>(
          "sismember",
          `user:${friendObj.friend.id}:block_list`,
          session.user.id
        );
      })
    );

    console.log("blockedByFriendIdsReq ", blockedByFriendIdsReq);

    for (let i = 0; i < blockedByFriendIdsReq.length; i++) {
      if (blockedByFriendIdsReq[i]) {
        blockedByFriendIds.push(friendsRes[i].friend.id);
      }
    }

    friends = friendsRes;
    isAlreadyInExplorer = isAlreadyInExplorerRes;
    blockedFriendIds = blockedFriendsIdRes;
  } catch (error) {
    notFound();
  }

  return (
    <div className="h-screen grid place-items-center bg-landing-wave-lines bg-fixed bg-cover bg-no-repeat bg-center">
      <section className="convo backdrop-blur-sm flex xl:container w-full relative shadow-lg xl:rounded-2xl overflow-hidden h-screen xl:h-[90vh] max-h-screen">
        <ReduxProvider>
          <NewFriendRequestsSubscriber
            initialFriendRequestList={incomingFriendRequests}
            sessionId={session.user.id}
          />
          <FriendsChatSubscriber
            initialFriends={friends}
            sessionId={session.user.id}
          />
          <BlockedUsersSubscriber
            initialBlockedIds={blockedFriendIds}
            initialBlockedByIds={blockedByFriendIds}
            sessionId={session.user.id}
          />
          <ExplorerStatus isAlreadyInExplorer={!!isAlreadyInExplorer} />
          <OnlineMembersSubscriber />
          <ResponsiveChatSidebar userHead={<HeadUser session={session} />}>
            {children}
          </ResponsiveChatSidebar>
        </ReduxProvider>
      </section>
    </div>
  );
};

export default ChatListLayout;
