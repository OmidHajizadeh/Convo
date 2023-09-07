"use client";

import { useAppSelector } from "@/store/Redux/hooks";

export const useOnlineStatus = (id: string) => {
  const { members } = useAppSelector((state) => state.onlineMembers);
  return {
    isUserOnline: members.includes(id),
  };
};
