"use client";

import Image from "next/image";
import { useState } from "react";

import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
} from "@/lib/Material/MaterialClientComponents";
import { MenuIcon } from "@/lib/Material/MaterialClientIcons";

import UserOptions from "./UserOptions";
import ToggleThemeButton from "./ToggleThemeButton";
import { useTheme } from "next-themes";

const drawerWidth = 320;

type ResponsiveChatSidebarProps = {
  children: React.ReactNode;
  userHead: React.ReactNode;
};

export default function ResponsiveChatSidebar({
  children,
  userHead,
}: ResponsiveChatSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { resolvedTheme } = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <Toolbar />
      <div
        className={`convo-menu__user p-3 ${
          resolvedTheme === "light" ? "text-black" : "text-white"
        }`}
      >
        {userHead}
      </div>
      <Divider />
      <ul className="mt-2">
        <UserOptions onCloseDrawer={handleDrawerToggle} />
      </ul>
    </>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        className=""
        position="absolute"
        elevation={0}
        sx={{
          width: { xl: `calc(100% - ${drawerWidth}px)` },
          ml: { xl: `${drawerWidth}px` },
          border: "unset",
          backgroundColor: (t) =>
            resolvedTheme === "light"
              ? t.palette.secondary.light
              : t.palette.primary.main,
          backdropFilter: "blur(8px)",
        }}
      >
        <Toolbar className="flex items justify-between">
          <span className="flex-grow flex items-center">
            <IconButton
              className=""
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { xl: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Image
              src="/logo.png"
              alt="کانوو"
              width={400}
              height={400}
              className="w-8 h-8 me-4"
            />
            <h6 className="text-black dark:text-white text-xl">کانوو</h6>
          </span>
          <ToggleThemeButton />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        className=""
        sx={{ width: { xl: drawerWidth }, flexShrink: { xl: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          className=""
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", xl: "none" },
            "& .MuiDrawer-paper": {
              backgroundColor:
                resolvedTheme === "light" ? "rgb(248 250 252)" : "#000",
              border: "unset",
              boxSizing: "border-box",
              width: drawerWidth,
            },
            "& .MuiToolbar-gutters": {
              display: "none",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          className=""
          sx={{
            display: { xs: "none", xl: "block" },
            "& .MuiDrawer-paper": {
              backgroundColor:
                resolvedTheme === "light"
                  ? "rgba(248, 250, 252, 0.6)"
                  : (t) => t.palette.primary.light,
              backdropFilter: "blur(4px)",
              border: "unset",
              boxSizing: "border-box",
              width: drawerWidth,
              position: "absolute",
            },
            "& .MuiToolbar-gutters": {
              display: "none",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        className="convo-menu flex flex-col"
        sx={{
          flexGrow: 1,
          width: { xl: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <section className="convo-chat flex-grow overflow-hidden relative flex flex-col">
          {children}
        </section>
      </Box>
    </Box>
  );
}
