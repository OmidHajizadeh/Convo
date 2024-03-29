"use client";

import { useState } from "react";

import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useAudio } from "@/hooks/convo-hooks";
import { useTheme } from "next-themes";

type FormValue = {
  email: string;
};

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const systemSound = useAudio("/sounds/convo-system.mp3");
  const { resolvedTheme } = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { register, handleSubmit, formState, setError } = useForm<FormValue>();
  const { errors, isValid, isSubmitting } = formState;

  async function submitHandler(data: FormValue) {
    try {
      toast.loading("در حال ارسال درخواست...", { id: "friend-request" });
      const res = await fetch("/api/friends/add", {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
        }),
      });

      const resData = await res.json();

      if (resData.error) {
        setError("email", { message: resData.message });
      } else {
        toast.success(resData.message);
        handleClose();
        systemSound.play();
      }
    } catch {
      toast.error("خطا در ارسال درخواست. لطفا دوباره امتحان کنید");
    } finally {
      toast.dismiss("friend-request");
    }
  }

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        disableElevation
        color="secondary"
        sx={{
          position: "fixed",
          bottom: "1rem",
          insetInlineEnd: "1rem",
          borderRadius: "50%",
          width: "4rem",
          height: "4rem",
        }}
      >
        <AddIcon sx={{ width: "2.25rem", height: "2.25rem" }} />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>افزودن دوست جدید</DialogTitle>
        <form onSubmit={handleSubmit(submitHandler)} noValidate>
          <DialogContent>
            <DialogContentText>
              برای افزودن دوست جدید، ابتدا از طریق فرم زیر به ایشان درخواست
              دوستی بفرستید. پس از تایید، هر دو در لیست چت یک دیگر قرار خواهید
              گرفت.
            </DialogContentText>
            <TextField
              fullWidth
              margin="dense"
              color="info"
              autoFocus
              id="friend-email"
              type="email"
              label="ایمیل"
              variant="standard"
              {...register("email", {
                required: "ایمیل نمیتواند خالی باشد",
              })}
              className="w-full md:w-80"
              helperText={errors.email?.message}
              error={!!errors.email}
            />
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                color: resolvedTheme === "dark" ? "#fff" : "#000",
              }}
              onClick={handleClose}
            >
              کنسل
            </Button>
            <Button
              type="submit"
              sx={{
                color: resolvedTheme === "dark" ? "#fff" : "#000",
              }}
              disabled={!isValid || isSubmitting}
            >
              ارسال درخواست
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
