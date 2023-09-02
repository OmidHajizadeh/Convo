"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

type FormValue = {
  email: string;
};

export default function FormDialog() {
  const [open, setOpen] = useState(false);

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
        // cache: 'no-store'
      });

      const resData = await res.json();

      if (resData.error) {
        setError("email", { message: resData.message });
      } else {
        toast.success(resData.message);
        handleClose();
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
        aria-label="افزودن دوست"
        className="!fixed bottom-4 end-4 !rounded-[50%] !w-16 !h-16"
      >
        <AddIcon className="!w-9 !h-9" />
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
            <Button onClick={handleClose}>کنسل</Button>
            <Button
              type="submit"
              // variant="contained"
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
