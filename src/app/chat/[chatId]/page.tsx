import { notFound } from "next/navigation";

import { fetchServerSession } from "@/utils/serverInteractions";
import ChatPartnerHead from "./_components/ChatPartnerHead";
import ChatPanel from "./_components/ChatPanel";
import { fetchRedis } from "@/utils/fetchRedis";

type ChatPageProps = {
  params: {
    chatId: string;
  };
};

async function chatPage(chatId: string) {
  const session = await fetchServerSession();
  if (!session) notFound();
  const { user } = session;

  const [userId1, userId2] = chatId.split("--");

  if (userId1 !== user.id && userId2 !== user.id) notFound();

  const chatPartnerId = user.id === userId1 ? userId2 : userId1;
  let chatPartner: User;

  try {
    let chatPartnerString = await fetchRedis<string>(
      "get",
      `user:${chatPartnerId}`
    );
    chatPartner = JSON.parse(chatPartnerString);
  } catch (error) {
    notFound();
  }
  return {
    user,
    chatPartner,
  };
}

export async function generateMetadata({ params: { chatId } }: ChatPageProps) {
  const { chatPartner } = await chatPage(chatId);
  return {
    title: `چت با ${chatPartner.name}`,
  };
}

const ChatPage = async ({ params: { chatId } }: ChatPageProps) => {
  const { chatPartner, user } = await chatPage(chatId);

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
