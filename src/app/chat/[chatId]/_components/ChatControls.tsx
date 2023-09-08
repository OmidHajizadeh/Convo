"use client";

import { useRef, useState } from "react";

import { toast } from "react-hot-toast";
import { nanoid } from "nanoid";
import ClipLoader from "react-spinners/ClipLoader";

import TextareaAutosize from "@mui/material/TextareaAutosize";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

import { useAppDispatch } from "@/store/Redux/hooks";
import { friendsActions } from "@/store/Redux/friendsSlice/friendsSlice";

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
    };

    try {
      setIsSending(true);

      dispatch(
        friendsActions.optimisticallyUpdateFriendChat({
          friendId: chatPartnerId,
          message,
          messageStatus: "pending",
        })
      );

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
        messageRef.current.value = "";
        setTimeout(() => {
          messageRef.current.focus();
          setText("");
        }, 100);
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
        <IconButton
          aria-label={isSending ? "در حال ارسال" : "ارسال"}
          onClick={sendMessage}
          disabled={isSending || text.length === 0}
          sx={{ width: "2.5rem" }}
        >
          {isSending ? <ClipLoader size={22} color="#737373" /> : <SendIcon />}
        </IconButton>
        <TextareaAutosize
          dir="auto"
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
          placeholder="پیام خود را وارد کنید..."
          disabled={isSending}
        />
      </div>
      <small className="absolute text-slate-400/50 -top-3 start-10">
        500/{text.length}
      </small>
    </div>
  );
};

export default ChatControls;
