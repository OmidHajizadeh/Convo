import Link from "next/link";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";

import { chatHrefConstructor } from "@/utils/helpers";
import { Friend } from "@/lib/Models/Friend";

type FriendListItemProps = {
  friendObject: Friend;
  session: Session;
};

const FriendListItem = ({ friendObject, session }: FriendListItemProps) => {
  const chatId = chatHrefConstructor(session.user.id, friendObject.friend.id);

  return (
    <li className="rounded-lg px-4 py-3 bg-slate-200">
      <Link className="flex w-full items-center" href={`/chat/${chatId}`}>
        <Avatar className="me-3">
          <Image
            src={friendObject.friend.image!}
            alt={friendObject.friend.name!}
            width={400}
            height={400}
          />
        </Avatar>
        <div className="flex flex-col">
          <span>{friendObject.friend.name}</span>
          <span className="text-slate-500 inline-flex items-center gap-2">
            {friendObject.messages.length !== 0 ? (
              <>
                <small>
                  {friendObject.messages[0].senderId === session.user.id
                    ? session.user.name
                    : friendObject.friend.name}
                </small>
                :
                <small className="lines-1">
                  {friendObject.messages[0].text}
                </small>
              </>
            ) : (
              <small>بدون گفتگو</small>
            )}
          </span>
        </div>
      </Link>
    </li>
  );
};

export default FriendListItem;
