"use client";

import Image from "next/image";
import { toast } from "react-hot-toast";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { Explorer } from "@/lib/Models/Explorer";

type ExplorerListItemProps = {
  explorer: Explorer;
};

const ExplorerListItem = ({ explorer }: ExplorerListItemProps) => {
  async function sendFriendRequestHandler() {
    try {
      toast.loading("در حال ارسال درخواست...", { id: "friend-request" });
      const res = await fetch("/api/friends/add", {
        method: "POST",
        body: JSON.stringify({
          email: explorer.user.email,
        }),
        // cache: 'no-store'
      });

      const resData = await res.json();

      if (resData.error) {
        toast.error(resData.message);
      } else {
        toast.success(resData.message);
      }
    } catch {
      toast.error("خطا در ارسال درخواست. لطفا دوباره امتحان کنید");
    } finally {
      toast.dismiss("friend-request");
    }
  }

  return (
    <li
      key={explorer.user.id}
      className="flex items-center rounded-lg px-4 py-3 bg-slate-200 text-start"
    >
      <Image
        src={explorer.user.image!}
        alt={explorer.user.name!}
        width={400}
        height={400}
        className="me-3 w-20 h-20 rounded-lg"
      />
      <span className="flex flex-col flex-grow">
        <span>{explorer.user.name}</span>
        <small className="text-slate-500">{explorer.statusText}</small>
      </span>
      <IconButton
        onClick={sendFriendRequestHandler}
        edge="end"
        aria-label="ارسال درخواست دوستی"
        className="self-start"
      >
        <AddCircleIcon />
      </IconButton>
    </li>
  );
};

export default ExplorerListItem;
