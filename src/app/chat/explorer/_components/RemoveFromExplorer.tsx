"use client";

import { Button } from "@mui/material";
import { useState } from "react";
import { toast } from "react-hot-toast";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { explorerActions } from "@/store/Redux/Explorer/explorerSlice";
import { useAppDispatch } from "@/store/Redux/hooks";

const RemoveFromExplorer = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsloading] = useState(false);
  async function removeProfileHandler() {
    try {
      setIsloading(true);
      const response = await fetch("/api/explorer/remove-from-explorer", {
        // cache: 'no-store'
      });
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
      setIsloading(false);
    }
  }

  return (
    <Button
      disabled={isLoading}
      onClick={removeProfileHandler}
      variant="contained"
      color="error"
      disableElevation
      className="!mt-4 self-center"
      startIcon={<RemoveCircleIcon />}
    >
      حذف پرفایل
    </Button>
  );
};

export default RemoveFromExplorer;
