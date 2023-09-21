"use client";

import { useEffect } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";

import { Avatar } from "@mui/material";

import { Friend } from "@/lib/Models/Friend";
import { pusherClient } from "@/lib/pusher/pusher";
import { friendsActions } from "@/store/Redux/friendsSlice/friendsSlice";
import { useAppDispatch } from "@/store/Redux/hooks";
import { toPusherKey } from "../helpers";
import { useAudio } from "@/hooks/convo-hooks";

type BlockedUsersSubscriberProps = {
  initialBlockedIds: string[];
  initialBlockedByIds: string[];
  sessionId: string;
};

const BlockedUsersSubscriber = ({
  initialBlockedIds,
  initialBlockedByIds,
  sessionId,
}: BlockedUsersSubscriberProps) => {
  const dispatch = useAppDispatch();
  const responseSound = useAudio("/sounds/convo-system.mp3");

  useEffect(() => {
    dispatch(
      friendsActions.setInitialBlockList({
        initialBlockedByIds,
        initialBlockedIds,
      })
    );
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
      dispatch(friendsActions.blockedByUser(user.id));
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
      responseSound.play();
      dispatch(friendsActions.unblockedByUser(user.id));
    }

    pusherClient.bind("unblocked_by_user", onBeingUnblockedHandler);
    () => {
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:unblocked`));
      pusherClient.unbind("unblocked_by_user", onBeingUnblockedHandler);
    };
  }, []);

  return null;
};

export default BlockedUsersSubscriber;
