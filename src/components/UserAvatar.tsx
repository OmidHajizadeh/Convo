"use client";

import Image from "next/image";

import { styled } from "@mui/material/styles";
import { Badge, Avatar } from "@mui/material";

import { useOnlineStatus } from "@/hooks/convo-hooks";

type UserAvatarProps = {
  user: User;
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#51d300",
    color: "#51d300",
    width: "0.75rem",
    height: "0.75rem",
    borderRadius: "50%",
    boxShadow: `0 0 0 2px ${theme.palette.secondary.light}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 3s infinite forwards ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "50%": {
        transform: "scale(1.7)",
        opacity: 0,
      },
      "100%": {
        transform: "scale(1.7)",
        opacity: 0,
      },
    },
  },
}));

const UserAvatar = ({ user }: UserAvatarProps) => {
  const { isUserOnline } = useOnlineStatus(user.id);

  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      variant="dot"
      invisible={!isUserOnline}
    >
      <Avatar sx={{ marginInlineEnd: "1rem" }} aria-label="تصویر پروفایل دوست">
        <Image src={user.image!} alt={user.name!} width={400} height={400} />
      </Avatar>
    </StyledBadge>
  );
};

export default UserAvatar;
