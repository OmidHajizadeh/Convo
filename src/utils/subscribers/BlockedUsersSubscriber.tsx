"use client";

import { useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { Avatar } from "@mui/material";

import { Friend } from "@/lib/Models/Friend";
import { pusherClient } from "@/lib/pusher/pusher";
import { friendsActions } from "@/store/Redux/friendsSlice/friendsSlice";
import { useAppDispatch } from "@/store/Redux/hooks";
import { chatHrefConstructor, toPusherKey } from "../helpers";
import { fetchRedis } from "../fetchRedis";
import { getChatMessages } from "../serverInteractions";
import { useAudio } from "@/hooks/convo-hooks";

type BlockedUsersSubscriberProps = {
  initialBlockedIds: string[];
  initialFriends: Friend[];
  sessionId: string;
};

const BlockedUsersSubscriber = ({
  initialBlockedIds,
  initialFriends,
  sessionId,
}: BlockedUsersSubscriberProps) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const responseSound = useAudio("/sounds/convo-system.mp3");

  useEffect(() => {
    dispatch(friendsActions.setInitialBlockedIds(initialBlockedIds));
  }, []);

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:blocked`));

    function onBeingBlockedHandler(user: User) {
      toast(`شما توسط ${user.name} بلاک شدید`, {
        icon: (
          <Avatar className="me-2 min-h-[20px] min-w-[20px]">
            <Image src="/logo.png" width={250} height={250} alt={user.name!} />
          </Avatar>
        ),
        id: "you-are-blocked",
      });
      responseSound.play();
      
    }

    pusherClient.bind("blocked_by_user", onBeingBlockedHandler);
    () => {
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:blocked`));
      pusherClient.unbind("blocked_by_user", onBeingBlockedHandler);
    };
  }, []);

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:unblocked`));

    function onBeingUnblockedHandler(user: User) {
      toast(`${user.name} شما را آنبلاک کرد`, {
        icon: (
          <Avatar className="me-2 min-h-[20px] min-w-[20px]">
            <Image src="/logo.png" width={250} height={250} alt={user.name!} />
          </Avatar>
        ),
        id: "you-are-unblocked",
      });
      const unblockedBy = initialFriends.find(
        (friendObj) => friendObj.friend.id === user.id
      );
      console.log(unblockedBy);
      dispatch(friendsActions.addNewFriendChat(unblockedBy!));
      responseSound.play();
    }

    pusherClient.bind("unblocked_by_user", onBeingUnblockedHandler);
    () => {
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:unblocked`));
      pusherClient.unbind("unblocked_by_user", onBeingUnblockedHandler);
    };
  }, [pathname]);

  return null;
};

export default BlockedUsersSubscriber;
