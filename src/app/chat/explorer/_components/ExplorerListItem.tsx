"use client";

import Image from "next/image";

import { toast } from "react-hot-toast";

import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import Tooltip from "@mui/material/Tooltip";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { Explorer } from "@/lib/Models/Explorer";
import { useAudio } from "@/hooks/convo-hooks";

type ExplorerListItemProps = {
  explorer: Explorer;
};

const ExplorerListItem = ({ explorer }: ExplorerListItemProps) => {
  const systemSound = useAudio("/sounds/convo-system.mp3");
  
  async function sendFriendRequestHandler() {
    try {
      toast.loading("در حال ارسال درخواست...", { id: "friend-request" });
      const res = await fetch("/api/friends/add", {
        method: "POST",
        body: JSON.stringify({
          email: explorer.user.email,
        }),
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
      systemSound.play();
    }
  }

  return (
    <ListItem
      key={explorer.user.id}
      className="flex items-center rounded-lg !p-4 bg-gray-100/80 dark:bg-gray-700/80 text-start"
      secondaryAction={
        <Tooltip title="ارسال درخواست دوستی" arrow placement="top-end">
          <IconButton
            className="dark:text-slate-200"
            onClick={sendFriendRequestHandler}
            edge="end"
            aria-label="ارسال درخواست دوستی"
          >
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
      }
    >
      <Image
        src={explorer.user.image!}
        alt={explorer.user.name!}
        width={400}
        height={400}
        className="me-3 w-20 h-20 rounded-lg"
      />
      <span className="flex flex-col flex-grow">
        <span className="dark:text-slate-200">{explorer.user.name}</span>
        <small className="dark:text-slate-200">{explorer.statusText}</small>
      </span>
    </ListItem>
  );
};

export default ExplorerListItem;
