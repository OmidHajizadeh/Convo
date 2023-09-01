import { notFound } from "next/navigation";

import { db } from "@/lib/database/db";
import {
  fetchServerSession,
} from "@/utils/serverInteractions";
import ChatPartnerHead from "./_components/ChatPartnerHead";
import ChatPanel from "./_components/ChatPanel";

type ChatPageProps = {
  params: {
    chatId: string;
  };
};

const ChatPage = async ({ params: { chatId } }: ChatPageProps) => {
  const session = await fetchServerSession();
  if (!session) notFound();
  const { user } = session;

  const [userId1, userId2] = chatId.split("--");

  if (userId1 !== user.id && userId2 !== user.id) notFound();

  const chatPartnerId = user.id === userId1 ? userId2 : userId1;
  const chatPartner = (await db.get(`user:${chatPartnerId}`)) as User;

  return (
    <div className="h-full">
      <div className="relative flex flex-col h-full">
        <div className="convo-chat__header absolute top-0 start-0 end-0 z-30">
          <ChatPartnerHead user={chatPartner} />
        </div>
        <ChatPanel
          chatId={chatId}
          chatPartner={chatPartner}
          currentUser={user}
        />
      </div>
    </div>
  );
};

export default ChatPage;
