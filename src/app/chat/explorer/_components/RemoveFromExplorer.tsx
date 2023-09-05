"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import { toast } from "react-hot-toast";

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { explorerActions } from "@/store/Redux/Explorer/explorerSlice";
import { useAppDispatch } from "@/store/Redux/hooks";


const Button = dynamic(() => import("@mui/material/Button"), {ssr: false})

const RemoveFromExplorer = () => {
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
