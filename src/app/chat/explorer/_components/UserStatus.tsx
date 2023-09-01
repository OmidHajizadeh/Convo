"use client";

import { useAppSelector } from "@/store/Redux/hooks";
import RemoveFromExplorer from "./RemoveFromExplorer";
import AddToExplorer from "./AddToExplorer";

const UserStatus = () => {
  const { isUserInExplorer } = useAppSelector((state) => state.explorer);

  return (
    <>
      {isUserInExplorer ? (
        <>
          <p className="mt-2">
            شما قبلا پروفایل خود را برای نمایش در اکسپلورر سایر کاربران قرار
            داده اید. از طریق دکمه زیر میتواند پروفایل خود را از اکسپلورر حذف
            کنید.
          </p>
          <RemoveFromExplorer />
        </>
      ) : (
        <>
          <p className="mt-2">
            برای اینکار، یک پیغام در فیلد زیر وارد کنید تا در کنار پروفایل شما
            برای دیگران نمایش داده شود. سپس دکمه ارسال پروفایل را بزنید.
          </p>
          <AddToExplorer />
        </>
      )}
    </>
  );
};

export default UserStatus;
