"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-hot-toast";

import { useAppDispatch } from "@/store/Redux/hooks";
import { explorerActions } from "@/store/Redux/Explorer/explorerSlice";

type ExplorerFormData = {
  statusText: string;
};

const AddToExplorer = () => {
  const { register, handleSubmit, formState } = useForm<ExplorerFormData>();
  const { errors, isSubmitting } = formState;
  const dispatch = useAppDispatch();

  const [statusLength, setStatusLength] = useState(0);

  async function submitProfileHandler(formData: ExplorerFormData) {
    try {
      const response = await fetch("/api/explorer/add-to-explorer", {
        method: "POST",
        body: JSON.stringify({
          statusText: formData.statusText,
        }),
      });
      const data = await response.json();
      if (data.error) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        dispatch(explorerActions.updateExplorerStatus(true));
      }
    } catch (error) {
      toast.error("خطایی در ارتباط با سرور رخ داد. لطفا دوباره امتحان کنید.");
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(submitProfileHandler)}
      className="flex flex-col items-center gap-3 mt-4"
    >
      <TextField
        label="پیغام"
        variant="outlined"
        color="info"
        {...register("statusText", {
          required: {
            value: true,
            message: "متن پیام نمیتواند خالی باشد",
          },
          maxLength: {
            value: 100,
            message: "متن پیام نمیتواند بیشتر از 100 کارکتر باشد",
          },
          onChange: (e) => {
            setStatusLength(e.target.value.length);
          },
        })}
        error={!!errors.statusText}
        helperText={
          errors.statusText ? errors.statusText.message : `100/${statusLength}`
        }
        className="w-full max-w-3xl !font-light"
      />
      <Button
        disabled={isSubmitting}
        type="submit"
        disableElevation
        variant="contained"
        startIcon={<SendIcon />}
      >
        ارسال پروفایل
      </Button>
    </form>
  );
};

export default AddToExplorer;
