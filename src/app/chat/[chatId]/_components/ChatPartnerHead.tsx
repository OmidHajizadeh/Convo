"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useTheme } from "next-themes";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import DoDisturbOffIcon from "@mui/icons-material/DoDisturbOff";

import { useAppDispatch, useAppSelector } from "@/store/Redux/hooks";
import { friendsActions } from "@/store/Redux/friendsSlice/friendsSlice";
import UserAvatar from "@/components/UserAvatar";
import { useAudio } from "@/hooks/convo-hooks";

type ChatPartnerHeadProps = {
  friendId: string;
};

const ChatPartnerHead = ({ friendId }: ChatPartnerHeadProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { resolvedTheme } = useTheme();
  const responseSound = useAudio("/sounds/convo-system.mp3");
  const { friendsList, blockedIds } = useAppSelector((state) => state.friends);

  const friendObject = friendsList.find(
    (friendObj) => friendObj.friend.id === friendId
  )!;
  
  const iUserBlocked = blockedIds.includes(friendId);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  async function handleBlockRelatedRequest(type: "block" | "unblock") {
    setLoading(true);
    toast.loading("درحال انجام عملیات...", { id: "block" });
    try {
      const res = await fetch(`/api/friends/${type}`, {
        method: "POST",
        body: JSON.stringify(friendId),
      });

      const resData = await res.json();
      if (resData.error) {
        toast.error(resData.message);
      } else {
        toast.success(resData.message);
        if (type === "unblock") {
          dispatch(friendsActions.unblockUser(friendId));
        } else {
          dispatch(friendsActions.blockUser(friendId));
        }
      }
    } catch {
      toast.error("خطا در برقراری  با سرور");
    } finally {
      toast.dismiss("block");
      setLoading(false);
      setOpen(false);
      responseSound.play();
    }
  }

  return (
    <div className="backdrop-blur-lg bg-slate-100/50 dark:bg-gray-500/50 absolute start-0 end-0 top-0 flex items-center justify-between px-4 py-4">
      <div className="flex items-center">
        <UserAvatar user={friendObject.friend} />
        <div>
          <h3 className="-mb-1 text-black dark:text-white">
            {friendObject.friend.name}
          </h3>
          <small className="text-slate-500 dark:text-slate-300">
            {friendObject.friend.email}
          </small>
        </div>
      </div>
      {iUserBlocked ? (
        <Tooltip title={`آنبلاک کردن ${friendObject.friend.name}`} placement="right">
          <IconButton
            disabled={loading}
            aria-label="آنبلاک"
            onClick={handleBlockRelatedRequest.bind(null, "unblock")}
          >
            <DoDisturbOffIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title={`بلاک کردن ${friendObject.friend.name}`} placement="right">
          <IconButton
            disabled={loading}
            aria-label="بلاک"
            onClick={handleClickOpen}
          >
            <DoNotDisturbOnIcon />
          </IconButton>
        </Tooltip>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          آیا میخواهید {friendObject.friend.name} را بلاک کنید ؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            بعد از بلاک کردن کاربر، مکالمات شما حفظ میشود ولی قادر به
            ارسال یا دریافت پیام نخواهید بود. آیا مطمئن هستید ؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              color: resolvedTheme === "dark" ? "#fff" : "#000",
            }}
            autoFocus
          >
            خیر
          </Button>
          <Button
            onClick={handleBlockRelatedRequest.bind(null, "block")}
            sx={{
              color: resolvedTheme === "dark" ? "#fff" : "#000",
            }}
            disabled={loading}
          >
            بله
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ChatPartnerHead;
