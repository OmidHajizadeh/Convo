"use client";

import PuffLoader from "react-spinners/PuffLoader";

type SpinnerProps = {
  color: string;
  size: number;
};

export const ConvoPuffLoader = ({ color, size }: SpinnerProps) => {
  return <PuffLoader color={color} size={size} />;
};
