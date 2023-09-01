"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { toast } from "react-hot-toast";
import { Avatar } from "@mui/material";

import { pusherClient } from "@/lib/pusher/pusher";
import { chatHrefConstructor, toPusherKey } from "@/utils/helpers";

import { Friend } from "@/lib/Models/Friend";
import { useAppDispatch } from "@/store/Redux/hooks";
import { friendsActions } from "@/store/Redux/friendsSlice/friendsSlice";

const FriendsChatSubscriber = ({
  sessionId,
  initialFriends,
}: {
  sessionId: string;
  initialFriends: Friend[];
}) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  // Setting initial chat list
  useEffect(() => {
    dispatch(friendsActions.setInitialFriendChats(initialFriends));
  }, []);

  // Setting new messages
  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`chat:${sessionId}:new-message`));

    const newMessageHandler = ({
      sender,
      message,
      chatId,
    }: {
      sender: User;
      message: Message;
      chatId: string;
    }) => {

      if (`/chat/${chatId}` !== pathname) {
        toast(
          (t) => {
            return (
              <Link
                href={`/chat/${chatId}`}
                onClick={() => toast.dismiss(t.id)}
              >
                {message.text}
              </Link>
            );
          },
          {
            icon: (
              <Avatar className="me-2 min-h-[20px] min-w-[20px]">
                <Image
                  src={sender.image!}
                  width={250}
                  height={250}
                  alt={sender.name!}
                />
              </Avatar>
            ),
            id: "new-message",
          }
        );
      }

      dispatch(
        friendsActions.optimisticallyUpdateFriendChat({ friendId: sender.id, message, messageStatus: 'success' })
      );
    };

    pusherClient.bind("incoming_message", newMessageHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`chat:${sessionId}:messages`));
      pusherClient.unbind("incoming_message", newMessageHandler);
    };
  }, [sessionId, pathname, dispatch]);

  return null;
};

export default FriendsChatSubscriber;
