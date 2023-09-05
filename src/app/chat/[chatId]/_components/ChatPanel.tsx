"use client";

import { useAppSelector } from "@/store/Redux/hooks";
import ChatControls from "./ChatControls";
import ChatMessages from "./ChatMessages";

type ChatPanelProps = {
  currentUser: User;
  chatPartner: User;
  chatId: string;
};

const ChatPanel = ({ currentUser, chatPartner, chatId }: ChatPanelProps) => {
  const { friendsList } = useAppSelector((state) => state.friends);

  const friend = friendsList.find(
    (friendObj) => friendObj.friend.id === chatPartner.id
  )!;

  return (
    <>
      <div className="convo-chat__conversation flex-grow overflow-auto">
        {friend && (
          <ChatMessages partnerObj={friend} currentUser={currentUser as User} />
        )}
      </div>
      <div className="convo-chat__controls bg-secondary-light dark:bg-primary-dark flex-shrink p-4">
        <ChatControls
          sessionId={currentUser.id}
          chatId={chatId}
          chatPartnerId={chatPartner.id}
        />
      </div>
    </>
  );
};

export default ChatPanel;
