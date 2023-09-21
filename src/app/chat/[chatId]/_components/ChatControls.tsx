"use client";

import { useRef, useState } from "react";

import { toast } from "react-hot-toast";
import { nanoid } from "nanoid";

import TextareaAutosize from "@mui/material/TextareaAutosize";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

import { useAppDispatch, useAppSelector } from "@/store/Redux/hooks";
import { friendsActions } from "@/store/Redux/friendsSlice/friendsSlice";
import { CircularProgress } from "@mui/material";

type ChatControlsProp = {
  chatId: string;
  chatPartnerId: string;
  sessionId: string;
};

const ChatControls = ({
  chatId,
  chatPartnerId,
  sessionId,
}: ChatControlsProp) => {
  const messageRef = useRef<HTMLTextAreaElement>(null!);
  const [isSending, setIsSending] = useState(false);
  const { blockedIds, blockedByIds } = useAppSelector((state) => state.friends);
  const iUserBlocked = blockedIds.includes(chatPartnerId);
  const amIBlocked = blockedByIds.includes(chatPartnerId);

  const [text, setText] = useState("");

  const dispatch = useAppDispatch();

  function onUserInput() {
    const messageText = messageRef.current.value;
    setText(messageText);
  }

  async function sendMessage() {
    const messageText = messageRef.current.value;
    if (!messageText || messageText.trim().length === 0) {
      toast.error("نمیتوانید پیام خالی بفرستید.");
      return;
    }

    const timestamp = Date.now();

    const message: Message = {
      id: nanoid(),
      senderId: sessionId,
      recieverId: chatPartnerId,
      text: messageText,
      timestamp,
      status: "pending",
    };

    dispatch(
      friendsActions.updateFriendChat({
        friendId: chatPartnerId,
        message,
      })
    );

    try {
      setIsSending(true);
      messageRef.current.value = "";
      const response = await fetch("/api/message/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          chatId,
        }),
      });
      const resData = await response.json();

      if (resData.error) {
        toast.error(resData.message);
        dispatch(
          friendsActions.updateFriendChat({
            friendId: chatPartnerId,
            message: {
              ...message,
              status: "error",
            },
          })
        );
      } else {
        dispatch(
          friendsActions.updateFriendChat({
            friendId: chatPartnerId,
            message: {
              ...message,
              status: "success",
            },
          })
        );
      }
    } catch (error) {
      toast.error("خطا در ارسال پیام. لطفا دوباره امتحان کنید.");
      dispatch(
        friendsActions.updateFriendChat({
          friendId: chatPartnerId,
          message: {
            ...message,
            status: "error",
          },
        })
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="relative pt-2">
      <div className="flex items-start bg-white dark:bg-gray-300/10 rounded-2xl overflow-hidden">
        {!iUserBlocked && !amIBlocked ? (
          <IconButton
            aria-label={isSending ? "در حال ارسال" : "ارسال"}
            onClick={sendMessage}
            disabled={text.length === 0}
            sx={{ width: "2.5rem" }}
          >
            <SendIcon />
          </IconButton>
        ) : null}
        <TextareaAutosize
          dir="auto"
          disabled={iUserBlocked || amIBlocked}
          maxRows={3}
          ref={messageRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          onChange={onUserInput}
          className="font-light focus:outline-none px-3 py-2 flex-grow resize-none dark:text-slate-200 dark:bg-primary-light"
          aria-label="متن پیام"
          placeholder={
            iUserBlocked
              ? "شما کاربر را بلاک کرده اید"
              : amIBlocked
              ? "کاربر شما را بلاک کرده است"
              : "پیام خود را بنویسید ..."
          }
        />
      </div>
      {!iUserBlocked && !amIBlocked ? (
        <small className="absolute text-slate-400/50 -top-3 start-10">
          500/{text.length}
        </small>
      ) : null}
    </div>
  );
};

export default ChatControls;
