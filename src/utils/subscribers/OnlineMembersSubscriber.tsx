"use client";

import { pusherClient } from "@/lib/pusher/pusher";
import { onlineMembersActions } from "@/store/Redux/OnlineUsers/onlineMembersSlice";
import { useAppDispatch } from "@/store/Redux/hooks";
import { Channel, Members } from "pusher-js";
import { useEffect, useState } from "react";

const OnlineMembersSubscriber = () => {
  const dispatch = useAppDispatch();
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  useEffect(() => {
    let channel = activeChannel;

    if (!channel) {
      channel = pusherClient.subscribe("presence-convo");
      setActiveChannel(channel);
    }

    function setInitialMembers(members: Members) {
      const initialMembers: string[] = [];

      members.each((member: Record<string, any>) =>
        initialMembers.push(member.id)
      );

      dispatch(onlineMembersActions.set(initialMembers));
    }

    function addNewMember(member: Record<string, any>) {
      dispatch(onlineMembersActions.add(member.id));
    }

    function removeMember(member: Record<string, any>) {
      dispatch(onlineMembersActions.remove(member.id));
    }

    channel.bind("pusher:subscription_succeeded", setInitialMembers);
    channel.bind("pusher:member_added", addNewMember);
    channel.bind("pusher:member_removed", removeMember);

    () => {
      if (activeChannel) {
        pusherClient.unsubscribe("presence-convo");
        setActiveChannel(null);
        pusherClient.unbind("pusher:subscription_succeeded", setInitialMembers);
        pusherClient.unbind("pusher:member_added", addNewMember);
        pusherClient.unbind("pusher:member_removed", removeMember);
      }
    };
  }, []);

  return null;
};

export default OnlineMembersSubscriber;
