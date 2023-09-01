"use client";

import { explorerActions } from "@/store/Redux/Explorer/explorerSlice";
import { useAppDispatch } from "@/store/Redux/hooks";
import { useEffect } from "react";

type ExplorerSubscriberProps = {
  isAlreadyInExplorer: boolean;
};

const ExplorerStatus = ({
  isAlreadyInExplorer,
}: ExplorerSubscriberProps) => {
  const dispatch = useAppDispatch();

  // Setting intial state of user in explorer
  useEffect(() => {
    dispatch(explorerActions.updateExplorerStatus(isAlreadyInExplorer))
  }, [])


  return null;
};

export default ExplorerStatus;
