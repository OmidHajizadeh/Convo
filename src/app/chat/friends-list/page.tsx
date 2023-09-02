import { notFound } from "next/navigation";

import { fetchServerSession } from "@/utils/serverInteractions";
import FriendList from "@/app/chat/friends-list/_components/FriendList";
import AddFriend from "@/components/AddFriend";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "لیست چت",
};

const ChatPage = async () => {
  const session = await fetchServerSession();
  if (!session) notFound();

  return (
    <div className="p-4 h-full overflow-auto relative">
      <AddFriend />
      <FriendList session={session} />
    </div>
  );
};

export default ChatPage;
