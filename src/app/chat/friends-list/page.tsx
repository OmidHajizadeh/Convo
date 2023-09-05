import { Metadata } from "next";
import { notFound } from "next/navigation";

import { fetchServerSession } from "@/utils/serverInteractions";
import FriendList from "@/app/chat/friends-list/_components/FriendList";
import AddFriend from "@/components/AddFriend";
import PageFrame from "@/components/PageFrame";

export const metadata: Metadata = {
  title: "لیست چت",
};

const ChatPage = async () => {
  const session = await fetchServerSession();
  if (!session) notFound();

  return (
    <PageFrame className="relative">
      <AddFriend />
      <FriendList session={session} />
    </PageFrame>
  );
};

export default ChatPage;
