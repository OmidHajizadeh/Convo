import { Metadata } from "next";
import { ChildrenProp } from "@/lib/Models/ChildrenProp";

export const metadata: Metadata = {
  title: "ورود/ثبت نام",
};

const LoadingPayout = ({ children }: ChildrenProp) => {
  return children;
};

export default LoadingPayout;