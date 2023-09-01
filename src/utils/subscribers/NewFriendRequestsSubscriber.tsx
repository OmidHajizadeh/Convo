"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { Avatar } from "@mui/material";

import { toPusherKey } from "@/utils/helpers";
import { pusherClient } from "@/lib/pusher/pusher";
import { friendRequestsActions } from "@/store/Redux/FriendRequests/friendRequestsSlice";
import { useAppDispatch } from "@/store/Redux/hooks";
import { friendsActions } from "@/store/Redux/friendsSlice/friendsSlice";
import { Friend } from "@/lib/Models/Friend";

const NewFriendRequestsSubscriber = ({
  sessionId,
  initialFriendRequestList,
}: {
  sessionId: string;
  initialFriendRequestList: User[];
}) => {
  const dispatch = useAppDispatch();

  // Setting inital friend requests
  useEffect(() => {
    dispatch(
      friendRequestsActions.setInitialFriendRequests(initialFriendRequestList)
    );
  }, []);

  // Setting incoming friend requests
  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${sessionId}:incoming_friend_requests`)
    );

    const friendRequestHandler = (friend: User) => {
      toast(
        (t) => {
          return (
            <Link href="/chat/requests" onClick={() => toast.dismiss(t.id)}>
              درخواست دوستی جدید از {friend.name}
            </Link>
          );
        },
        {
          icon: (
            <Avatar className="me-2 min-h-[20px] min-w-[20px]">
              <Image
                src={friend.image!}
                width={250}
                height={250}
                alt={friend.name!}
              />
            </Avatar>
          ),
          id: "new-friend-request",
        }
      );
      dispatch(friendRequestsActions.setNewFriendRequest(friend));
    };

    pusherClient.bind("incoming_friend_requests", friendRequestHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionId}:incoming_friend_requests`)
      );
      pusherClient.unbind("incoming_friend_requests", friendRequestHandler);
    };
  }, [sessionId, dispatch, initialFriendRequestList]);

  // Setting response to friend requests
  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${sessionId}:friend_request_response`)
    );

    function friendRequestResponseHandler({
      user: friend,
      state,
    }: {
      user: User;
      state: "accepted" | "denied";
    }) {
      switch (state) {
        case "accepted": {
          const friendObject: Friend = {
            friend,
            messages: [],
          };
          dispatch(friendsActions.addNewFriendChat(friendObject));
          toast.success(`درخواست دوستی شما با ${friend.name} پذیرفته شد`);
          break;
        }
        case "denied": {
          toast.error(`درخواست دوستی شما با ${friend.name} رد شد`);
          break;
        }
      }
    }

    pusherClient.bind("friend_request_response", friendRequestResponseHandler);
    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionId}:friend_request_response`)
      );
      pusherClient.unbind(
        "friend_request_response",
        friendRequestResponseHandler
      );
    };
  }, [sessionId, dispatch]);

  return null;
};

export default NewFriendRequestsSubscriber;
