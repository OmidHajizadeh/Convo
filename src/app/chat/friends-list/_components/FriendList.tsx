"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import FriendListItem from "@/app/chat/friends-list/_components/FriendListItem";
import { useAppSelector } from "@/store/Redux/hooks";
import { Friend } from "@/lib/Models/Friend";

type FriendListProps = {
  session: Session;
};

const FriendList = ({ session }: FriendListProps) => {
  const { friendsList } = useAppSelector((state) => state.friends);
  const [friendsListRedux, setFriendsListRedux] = useState<Friend[]>([]);

  // ! This messed up work is done to avoid hydration errors :/

  useEffect(() => {
    setFriendsListRedux(friendsList);
  }, [friendsList]);

  return (
    <>
      {friendsListRedux.length > 0 ? (
        <ul className="w-full space-y-3">
          {friendsListRedux.map((friendObject) => {
            return (
              <FriendListItem
                key={friendObject.friend.id}
                session={session}
                friendObject={friendObject}
              />
            );
          })}
        </ul>
      ) : (
        <div className="flex items-center justify-center h-full">
          <div>
            <Image
              src="/no-chat.svg"
              alt="بنر خالی بودن لیست چت"
              width={700}
              height={700}
              className="max-w-[26rem] w-full"
            />
            <h3 className="text-center mt-3 font-bold text-2xl">
              مکالمه ای پیدا نشد :(
            </h3>
          </div>
        </div>
      )}
    </>
  );
};

export default FriendList;
