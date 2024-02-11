"use client";

import { useAppSelector } from "@/store/Redux/hooks";
import ChatControls from "./ChatControls";
import ChatMessages from "./ChatMessages";

type ChatPanelProps = {
  currentUser: User;
  chatPartnerId: string;
  chatId: string;
};

const ChatPanel = ({ currentUser, chatPartnerId, chatId }: ChatPanelProps) => {
  const { friendsList } = useAppSelector((state) => state.friends);

  const friendObj = friendsList.find(
    (friendObj) => friendObj.friend.id === chatPartnerId
  )!;

  return (
    <>
      <div className="convo-chat__conversation flex-grow overflow-auto">
        {friendObj && (
          <ChatMessages
            partnerObj={friendObj}
            currentUser={currentUser as User}
          />
        )}
      </div>
      <div className="convo-chat__controls bg-secondary-light dark:bg-primary-dark flex-shrink p-4">
        <ChatControls
          sessionId={currentUser.id}
          chatId={chatId}
          chatPartnerId={chatPartnerId}
        />
      </div>
    </>
  );
};

export default ChatPanel;
