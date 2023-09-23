"use client";

import { useState } from "react";

import { toast } from "react-hot-toast";

import { Button } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

import { explorerActions } from "@/store/Redux/Explorer/explorerSlice";
import { useAppDispatch } from "@/store/Redux/hooks";
import { useAudio } from "@/hooks/convo-hooks";

const RemoveFromExplorer = () => {
  const systemSound = useAudio("/sounds/convo-system.mp3");
  const dispatch = useAppDispatch();
  const [isLoading, setIsloading] = useState(false);
  async function removeProfileHandler() {
    try {
      setIsloading(true);
      const response = await fetch("/api/explorer/remove-from-explorer");
      const data = await response.json();
      if (data.error) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        dispatch(explorerActions.updateExplorerStatus(false));
      }
    } catch {
      toast.error("خطایی در ارتباط با سرور رخ داد. لطفا دوباره امتحان کنید.");
    } finally {
      systemSound.play();
      setIsloading(false);
    }
  }

  return (
    <Button
      disabled={isLoading}
      onClick={removeProfileHandler}
      color="warning"
      disableElevation
      className="!mt-4 !font-light"
      startIcon={<RemoveCircleIcon />}
    >
      حذف
    </Button>
  );
};

export default RemoveFromExplorer;
