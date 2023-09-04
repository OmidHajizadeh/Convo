"use client";

import { useEffect, useState } from "react";

import { useAppSelector } from "@/store/Redux/hooks";
import ChatControls from "./ChatControls";
import ChatMessages from "./ChatMessages";
import { Friend } from "@/lib/Models/Friend";

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

  // const [friend, setFriend] = useState<Friend>();
  // ! This messed up work is done to avoid hydration errors :/
  // useEffect(() => {
  // const friendObj = friendsList.find(
  //   (friendObj) => friendObj.friend.id === chatPartner.id
  // )!;
  //   setFriend(friendObj);
  // }, [chatPartner.id, friendsList]);

  return (
    <>
      <div className="convo-chat__conversation flex-grow overflow-auto">
        {friend && (
          <ChatMessages partnerObj={friend} currentUser={currentUser as User} />
        )}
      </div>
      <div className="convo-chat__controls bg-secondary-light/50 dark:bg-primary-dark flex-shrink p-4 bg-success/30">
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
