"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { toast } from "react-hot-toast";

import { Tooltip, IconButton, ListItem } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import { useAppDispatch, useAppSelector } from "@/store/Redux/hooks";
import { friendRequestsActions } from "@/store/Redux/FriendRequests/friendRequestsSlice";
import { friendsActions } from "@/store/Redux/friendsSlice/friendsSlice";
import { Friend } from "@/lib/Models/Friend";
import UserAvatar from "@/components/UserAvatar";
import { useAudio } from "@/hooks/convo-hooks";

import NoRequestSVG from "@/public/icons/no-request.svg";

const RequestsList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const systemSound = useAudio("/sounds/convo-system.mp3");

  const dispatch = useAppDispatch();
  const { friendRequestsList } = useAppSelector(
    (store) => store.friendRequests
  );

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) {
    return null;
  }

  async function handleRequest(senderId: string, action: string) {
    setIsLoading(true);
    toast.loading("در حال اعمال درخواست...", { id: "handle-request" });
    try {
      const res = await fetch(`/api/friends/${action}`, {
        method: "POST",
        body: JSON.stringify({
          id: senderId,
        }),
      });

      const resData = await res.json();

      if (resData.error) {
        toast.error(resData.message);
      } else {
        toast.success(resData.message);
        dispatch(friendRequestsActions.handledFriendRequest(senderId));
        if (action === "accept") {
          const friend = JSON.parse(resData.friendString) as User;
          const friendObject: Friend = {
            friend,
            messages: [],
          };
          dispatch(friendsActions.addNewFriendChat(friendObject));
        }
      }
    } catch (error) {
      toast.error("خطا در ارسال درخواست. لطفا دوباره امتحان کنید");
    } finally {
      systemSound.play();
      setIsLoading(false);
      toast.dismiss("handle-request");
    }
  }

  return (
    <>
      {friendRequestsList.length > 0 ? (
        <ul className="space-y-3">
          {friendRequestsList.map((user) => {
            return (
              <ListItem
                key={user.id}
                className="rounded-lg !py-3 bg-gray-100/80 dark:bg-gray-700/80"
                secondaryAction={
                  <div className="flex gap-2">
                    <Tooltip title="پذیرفتن" arrow placement="top">
                      <IconButton
                        edge="end"
                        aria-label="پذیرفتن"
                        onClick={handleRequest.bind(null, user.id, "accept")}
                        disabled={isLoading}
                      >
                        <CheckCircleIcon className="dark:text-slate-200" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="رد کردن" arrow placement="top">
                      <IconButton
                        edge="end"
                        aria-label="رد کردن"
                        onClick={handleRequest.bind(null, user.id, "deny")}
                        disabled={isLoading}
                      >
                        <CancelIcon className="dark:text-slate-200" />
                      </IconButton>
                    </Tooltip>
                  </div>
                }
              >
                <UserAvatar user={user} />
                <span className="flex flex-col">
                  <span className="dark:text-slate-200">{user.name}</span>
                  <small className="dark:text-slate-200">{user.email}</small>
                </span>
              </ListItem>
            );
          })}
        </ul>
      ) : (
        <div className="grid place-items-center h-full">
          <div className="w-full flex items-center flex-col">
            <Image
              src={NoRequestSVG}
              alt="بنر لیست خالی درخواست ها"
              width={700}
              height={700}
              className="max-w-[26rem] w-full"
            />
            <h3 className="text-center mt-3 font-bold text-2xl">
              فعلاً درخواست دوستی جدیدی ندارید
            </h3>
          </div>
        </div>
      )}
    </>
  );
};

export default RequestsList;
