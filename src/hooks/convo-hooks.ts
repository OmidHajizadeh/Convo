"use client";

import { useAppSelector } from "@/store/Redux/hooks";
import { useRef } from "react";

export const useOnlineStatus = (id: string) => {
  const { members } = useAppSelector((state) => state.onlineMembers);
  return {
    isUserOnline: members.includes(id),
  };
};

export const useAudio = (src: string) => {
  const audio = useRef(new Audio(src));
  return audio.current;
};
