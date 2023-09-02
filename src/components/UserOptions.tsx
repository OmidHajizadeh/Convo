"use client";

import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import ExploreIcon from "@mui/icons-material/Explore";
import Avatar from "@mui/material/Avatar";
import InfoIcon from '@mui/icons-material/Info';

import { useAppSelector } from "@/store/Redux/hooks";

export default function UserOptions({
  onCloseDrawer,
}: {
  onCloseDrawer: () => void;
}) {
  const { friendRequestsCount } = useAppSelector(
    (store) => store.friendRequests
  );

  function closeDrawerHandler() {
    onCloseDrawer();
  }

  return (
    <>
      <li className="px-4 py-2 flex">
        <Link className="flex items-center w-full" onClick={closeDrawerHandler} href="/chat/friends-list">
          <Avatar className="me-3">
            <Diversity3Icon />
          </Avatar>
          <span>لیست چت</span>
        </Link>
      </li>

      <li className="px-4 py-2 flex">
        <Link className="flex items-center w-full" onClick={closeDrawerHandler} href="/chat/requests">
          <Avatar className="me-3">
            <GroupIcon />
          </Avatar>
          <span className="flex flex-col">
            <span>درخواست ها</span>
            {friendRequestsCount === 0 ? null : (
              <small className="text-red-600">
                {friendRequestsCount} درخواست دوستی دارید
              </small>
            )}
          </span>
        </Link>
      </li>

      <li className="px-4 py-2 flex">
        <Link className="flex items-center w-full" onClick={closeDrawerHandler} href="/chat/explorer">
          <Avatar className="me-3">
            <ExploreIcon />
          </Avatar>
          <span>اکسپلورر</span>
        </Link>
      </li>

      <li className="px-4 py-2 flex">
        <Link className="flex items-center w-full" onClick={closeDrawerHandler} href="/chat/edit-profile">
          <Avatar className="me-3">
            <EditIcon />
          </Avatar>
          <span>ویرایش اطلاعات</span>
        </Link>
      </li>
      <li className="px-4 py-2 flex">
        <Link className="flex items-center w-full" onClick={closeDrawerHandler} href="/chat/about">
          <Avatar className="me-3">
            <InfoIcon />
          </Avatar>
          <span>درباره کانوو</span>
        </Link>
      </li>

      <li className="px-4 py-2 flex">
        <Link className="flex items-center w-full" onClick={closeDrawerHandler} href="/api/auth/signout">
          <Avatar className="me-3">
            <LogoutIcon />
          </Avatar>
          <span>خروج</span>
        </Link>
      </li>
    </>
  );
}
