import Link from "next/link";

import { chatHrefConstructor } from "@/utils/helpers";
import { Friend } from "@/lib/Models/Friend";
import UserAvatar from "@/components/UserAvatar";


type FriendListItemProps = {
  friendObject: Friend;
  session: Session;
};

const FriendListItem = ({ friendObject, session }: FriendListItemProps) => {
  const chatId = chatHrefConstructor(session.user.id, friendObject.friend.id);

  return (
    <li className="rounded-lg px-4 py-3 bg-gray-100/80 dark:bg-gray-700/80">
      <Link className="flex w-full items-center" href={`/chat/${chatId}`}>
        <UserAvatar user={friendObject.friend} />
        <div className="flex flex-col">
          <span className="dark:text-slate-200">{friendObject.friend.name}</span>
          <small className="text-slate-500 dark:text-slate-200 inline-flex items-center gap-2">
            {friendObject.messages.length !== 0 ? (
              <>
                <span>
                  {friendObject.messages[0].senderId === session.user.id
                    ? session.user.name
                    : friendObject.friend.name}
                </span>
                :
                <span dir="auto" className="lines-1">{friendObject.messages[0].text}</span>
              </>
            ) : (
              <small>بدون گفتگو</small>
            )}
          </small>
        </div>
      </Link>
    </li>
  );
};

export default FriendListItem;
