"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import { format } from "date-fns";
import ClockLoader from "react-spinners/ClockLoader";

import Avatar from "@mui/material/Avatar";
import ErrorIcon from "@mui/icons-material/Error"

import { Friend } from "@/lib/Models/Friend";

type ChatMessagesProps = {
  currentUser: User;
  partnerObj: Friend;
};

const ChatMessages = ({ currentUser, partnerObj }: ChatMessagesProps) => {
  function formattedTimestamp(timestamp: number) {
    return format(timestamp, "HH:mm");
  }

  const sectionRef = useRef<HTMLElement>(null!);

  useEffect(() => {
    sectionRef.current.scrollTop = sectionRef.current.scrollHeight;
  });

  return (
    <section
      ref={sectionRef}
      className="p-3 overflow-auto bg-chat-pattern h-full bg-blend-darken dark:bg-black/60 bg-fixed bg-center bg-repeat bg-contain"
    >
      <div className="grid place-items-center">
        <div className="mt-20 mb-8 flex flex-col items-center">
          <Image
            src={partnerObj.friend.image}
            width={800}
            height={800}
            alt={partnerObj.friend.name!}
            className="w-20 h-20 mb-4 rounded-full"
          />
          <h4 className="bg-slate-200 dark:bg-slate-800 rounded-md text-slate-800 dark:text-slate-200 px-3 py-1">
            چت خود را با {partnerObj.friend.name} آغاز کنید
          </h4>
        </div>
      </div>
      <article className="flex gap-3 flex-col-reverse">
        {partnerObj.messages.map((message, index, messagesArray) => {
          const isMessageFromCurrentUser = message.senderId === currentUser.id;
          const hasANextMessage =
            messagesArray[index].senderId ===
            messagesArray[index - 1]?.senderId;
          return (
            <div
              key={message.id}
              className={`chat-message flex gap-2 items-end ${
                isMessageFromCurrentUser ? "self-start" : "self-end"
              }`}
            >
              <figure
                className={`chat-message__profile-container w-12${
                  isMessageFromCurrentUser ? " order-1" : " order-2"
                }${isMessageFromCurrentUser ? " hidden sm:block" : ""}`}
              >
                {!hasANextMessage && (
                  <Avatar>
                    <Image
                      src={
                        isMessageFromCurrentUser
                          ? currentUser.image
                          : partnerObj.friend.image
                      }
                      width={400}
                      height={400}
                      alt={partnerObj.friend.name}
                      referrerPolicy="no-referrer"
                    />
                  </Avatar>
                )}
              </figure>
              <div
                className={`chat-message__context-container break-words text-black dark:text-slate-200 flex rounded-xl flex-col py-2 px-3 max-w-xs min-w-[7rem] ${
                  isMessageFromCurrentUser
                    ? "order-2 bg-zinc-300 dark:bg-zinc-950"
                    : "order-1 bg-teal-400 dark:bg-teal-950"
                } ${
                  !hasANextMessage &&
                  isMessageFromCurrentUser &&
                  "rounded-es-none"
                } ${
                  !hasANextMessage &&
                  !isMessageFromCurrentUser &&
                  "rounded-ee-none"
                }`}
              >
                <p className="chat-message__text mb-1 font-light">
                  {message.text}
                </p>
                <small
                  className={`chat-message__date text-gray-600/60 dark:text-white/50 ${
                    isMessageFromCurrentUser ? "self-end" : "self-start"
                  }`}
                >
                  {formattedTimestamp(message.timestamp)}
                </small>
              </div>

              {message.status === "pending" ? (
                <ClockLoader
                  className="order-3 mb-[0.15rem]"
                  size={20}
                  color="#000000"
                />
              ) : message.status === "error" ? (
                <ErrorIcon sx={{order: 3}} />
              ) : null}
            </div>
          );
        })}
      </article>
    </section>
  );
};

export default ChatMessages;
