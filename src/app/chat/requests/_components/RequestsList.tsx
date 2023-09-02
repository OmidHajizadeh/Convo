"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import { useAppDispatch, useAppSelector } from "@/store/Redux/hooks";
import { friendRequestsActions } from "@/store/Redux/FriendRequests/friendRequestsSlice";
import { friendsActions } from "@/store/Redux/friendsSlice/friendsSlice";
import { Friend } from "@/lib/Models/Friend";

const RequestsList = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const { friendRequestsList } = useAppSelector(
    (store) => store.friendRequests
  );

  async function handleRequest(senderId: string, action: string) {
    setIsLoading(true);
    toast.loading("در حال اعمال درخواست...", { id: "handle-request" });
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

    setIsLoading(false);
    toast.dismiss("handle-request");
  }
  return (
    <>
      {friendRequestsList.length > 0 ? (
        <ul className="space-y-3 mt-3">
          {friendRequestsList.map((user) => {
            return (
              <ListItem
                key={user.id}
                className="rounded-lg !py-4 bg-slate-200"
                secondaryAction={
                  <div className="flex gap-2">
                    <IconButton
                      edge="end"
                      aria-label="پذیرفتن"
                      onClick={handleRequest.bind(null, user.id, "accept")}
                      disabled={isLoading}
                    >
                      <CheckCircleIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="رد کردن"
                      onClick={handleRequest.bind(null, user.id, "deny")}
                      disabled={isLoading}
                    >
                      <CancelIcon />
                    </IconButton>
                  </div>
                }
              >
                <Avatar className="me-3">
                  <Image
                    src={user.image!}
                    width={400}
                    height={400}
                    alt={user.name!}
                  />
                </Avatar>
                <span className="flex flex-col">
                  <span>{user.name}</span>
                  <small className="text-slate-500">{user.email}</small>
                </span>
              </ListItem>
            );
          })}
        </ul>
      ) : (
        <div className="grid place-items-center h-full">
          <div className="w-full flex items-center flex-col">
            <Image
              src="/no-request.svg"
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
