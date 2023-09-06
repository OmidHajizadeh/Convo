"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useTheme } from "next-themes";

import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import EditIcon from "@mui/icons-material/Edit";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import ExploreIcon from "@mui/icons-material/Explore";
import InfoIcon from "@mui/icons-material/Info";

import { useAppSelector } from "@/store/Redux/hooks";

type NavLink = {
  path: string;
  icon: React.ReactNode;
  title: string;
  isActive: boolean;
  badge?: number;
};

export default function UserOptions({
  onCloseDrawer,
}: {
  onCloseDrawer: () => void;
}) {
  const { friendRequestsCount } = useAppSelector(
    (store) => store.friendRequests
  );
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();

  function closeDrawerHandler() {
    onCloseDrawer();
  }

  const navLinks: NavLink[] = [
    {
      path: "/chat/friends-list",
      title: "لیست چت",
      icon: <Diversity3Icon className="dark:text-black" />,
      isActive: pathname === "/chat/friends-list",
    },
    {
      path: "/chat/requests",
      title: "درخواست ها",
      icon: <GroupIcon className="dark:text-black" />,
      isActive: pathname === "/chat/requests",
      badge: friendRequestsCount,
    },
    {
      path: "/chat/explorer",
      title: "اکسپلورر",
      icon: <ExploreIcon className="dark:text-black" />,
      isActive: pathname === "/chat/explorer",
    },
    {
      path: "/chat/edit-profile",
      title: "ویرایش اطلاعات",
      icon: <EditIcon className="dark:text-black" />,
      isActive: pathname === "/chat/edit-profile",
    },
    {
      path: "/chat/about",
      title: "درباره کانوو",
      icon: <InfoIcon className="dark:text-black" />,
      isActive: pathname === "/chat/about",
    },
    {
      path: "/api/auth/signout",
      title: "خروج",
      icon: <LogoutIcon className="dark:text-black" />,
      isActive: pathname === "/api/auth/signout",
    },
  ];

  return (
    <>
      {navLinks.map((navLink) => {
        if (navLink.badge) {
          return (
            <li key={navLink.path} className="px-4 py-2">
              <Link
                className="flex items-center w-full"
                onClick={closeDrawerHandler}
                href={navLink.path}
              >
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  badgeContent={
                    <span className="inline-flex justify-center items-center bg-red-600 text-white aspect-square min-w-4 min-h-4 w-full h-full rounded-full">
                      {navLink.badge}
                    </span>
                  }
                >
                  <Avatar sx={{ marginInlineEnd: "0.75rem" }}>
                    <GroupIcon className="dark:text-black" />
                  </Avatar>
                </Badge>
                <span
                  className={`${
                    resolvedTheme === "light"
                      ? navLink.isActive
                        ? "text-orange-500"
                        : "text-black"
                      : navLink.isActive
                      ? "text-orange-400"
                      : "text-white"
                  }`}
                >
                  {navLink.title}
                </span>
              </Link>
            </li>
          );
        }
        return (
          <li key={navLink.path} className="px-4 py-2">
            <Link
              className="flex items-center w-full"
              onClick={closeDrawerHandler}
              href={navLink.path}
            >
              <Avatar sx={{ marginInlineEnd: "0.75rem" }}>
                {navLink.icon}
              </Avatar>
              <span
                className={`${
                  resolvedTheme === "light"
                    ? navLink.isActive
                      ? "text-orange-500"
                      : "text-black"
                    : navLink.isActive
                    ? "text-orange-400"
                    : "text-white"
                }`}
              >
                {navLink.title}
              </span>
            </Link>
          </li>
        );
      })}
      {/* <li className="px-4 py-2">
        <Link
          className="flex items-center w-full"
          onClick={closeDrawerHandler}
          href="/chat/friends-list"
        >
          <Avatar sx={{ marginInlineEnd: "0.75rem" }}>
            <Diversity3Icon className="" />
          </Avatar>
          <span
            className={`${
              resolvedTheme === "light" ? "text-black" : "text-white"
            }`}
          >
            لیست چت
          </span>
        </Link>
      </li>

      <li className="px-4 py-2">
        <Link
          className="flex items-center w-full"
          onClick={closeDrawerHandler}
          href="/chat/requests"
        >
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            badgeContent={
              friendRequestsCount === 0 ? null : (
                <span className="inline-flex justify-center items-center bg-red-500 text-white aspect-square min-w-4 min-h-4 w-full h-full rounded-full">
                  {friendRequestsCount}
                </span>
              )
            }
          >
            <Avatar sx={{ marginInlineEnd: "0.75rem" }}>
              <GroupIcon className="dark:text-black" />
            </Avatar>
          </Badge>
          <span
            className={`${
              resolvedTheme === "light" ? "text-black" : "text-white"
            }`}
          >
            درخواست ها
          </span>
        </Link>
      </li>

      <li className="px-4 py-2">
        <Link
          className="flex items-center w-full"
          onClick={closeDrawerHandler}
          href="/chat/explorer"
        >
          <Avatar sx={{ marginInlineEnd: "0.75rem" }}>
            <ExploreIcon className="dark:text-black" />
          </Avatar>
          <span
            className={`${
              resolvedTheme === "light" ? "text-black" : "text-white"
            }`}
          >
            اکسپلورر
          </span>
        </Link>
      </li>

      <li className="px-4 py-2">
        <Link
          className="flex items-center w-full"
          onClick={closeDrawerHandler}
          href="/chat/edit-profile"
        >
          <Avatar sx={{ marginInlineEnd: "0.75rem" }}>
            <EditIcon className="dark:text-black" />
          </Avatar>
          <span
            className={`${
              resolvedTheme === "light" ? "text-black" : "text-white"
            }`}
          >
            ویرایش اطلاعات
          </span>
        </Link>
      </li>

      <li className="px-4 py-2">
        <Link
          className="flex items-center w-full"
          onClick={closeDrawerHandler}
          href="/chat/about"
        >
          <Avatar sx={{ marginInlineEnd: "0.75rem" }}>
            <InfoIcon className="dark:text-black" />
          </Avatar>
          <span
            className={`${
              resolvedTheme === "light" ? "text-black" : "text-white"
            }`}
          >
            درباره کانوو
          </span>
        </Link>
      </li>

      <li className="px-4 py-2">
        <Link
          className="flex items-center w-full"
          onClick={closeDrawerHandler}
          href="/api/auth/signout"
        >
          <Avatar sx={{ marginInlineEnd: "0.75rem" }}>
            <LogoutIcon className="dark:text-black" />
          </Avatar>
          <span
            className={`${
              resolvedTheme === "light" ? "text-black" : "text-white"
            }`}
          >
            خروج
          </span>
        </Link>
      </li> */}
    </>
  );
}
