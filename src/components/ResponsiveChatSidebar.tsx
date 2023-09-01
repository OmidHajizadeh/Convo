"use client";

import Image from "next/image";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import UserOptions from "./UserOptions";

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <Toolbar />
      <div className="convo-menu__user p-3">{userHead}</div>
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
        position="absolute"
        variant="outlined"
        sx={{
          width: { xl: `calc(100% - ${drawerWidth}px)` },
          ml: { xl: `${drawerWidth}px` },
          border: "unset",
          backgroundColor: t => t.palette.success.main
        }}
      >
        <Toolbar>
          <IconButton
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
          <h6 className="text-black">کانوو</h6>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { xl: drawerWidth }, flexShrink: { xl: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", xl: "none" },
            "& .MuiDrawer-paper": {
              backgroundColor: 'rgb(248 250 252)',
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
              backgroundColor: 'rgb(248 250 252 / 0.5)',
              backdropFilter: "blur(4px)",
              // border: "unset",
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
