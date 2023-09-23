"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { Button, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { useAudio } from "@/hooks/convo-hooks";
import UploadImage from "./UploadImage";

type EditFormProps = {
  session: Session;
};

type EditFormData = {
  name: string;
};

const EditForm = ({ session }: EditFormProps) => {
  const systemSound = useAudio("/sounds/convo-system.mp3");
  const { register, handleSubmit, formState } = useForm<EditFormData>({
    defaultValues: {
      name: session.user.name,
    },
  });

  const { errors, isSubmitting } = formState;
  const router = useRouter();
  const [name, setName] = useState(session.user.name);
  const [imageUrl, setImageUrl] = useState(session.user.image);

  function onImageUpload(url: string) {
    setImageUrl(url);
  }

  async function submitProfileHandler(formData: EditFormData) {
    if (isSubmitting) return;

    try {
      toast.loading("در حال ارسال درخواست...", { id: "edit-profile" });
      const res = await fetch("/api/edit-profile", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          image: imageUrl,
        }),
      });

      const resData = await res.json();

      if (resData.error) {
        toast.error(resData.message);
      } else {
        toast.success(resData.message);
        router.refresh();
      }
    } catch {
      toast.error("خطا در ارسال درخواست. لطفا دوباره امتحان کنید");
    } finally {
      systemSound.play();
      toast.dismiss("edit-profile");
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(submitProfileHandler)}
      className="flex flex-col gap-4 items-center mt-4"
      id="edit-profile"
    >
      <UploadImage
        onChange={(url) => {
          onImageUpload(url);
        }}
        disabled={isSubmitting}
        value={imageUrl}
      />
      <TextField
        label="اسم نمایشی"
        variant="standard"
        color="info"
        className="text-slate-200"
        {...register("name", {
          required: {
            value: true,
            message: "اسم نمیتواند خالی باشد",
          },
          maxLength: {
            value: 25,
            message: "اسم نمیتواند بیشتر از 25 کارکتر باشد",
          },
          onChange: (e) => {
            setName(e.target.value);
          },
        })}
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : `25/${name.length}`}
      />
      <Button
        type="submit"
        disableElevation
        variant="contained"
        startIcon={<EditIcon />}
      >
        ویرایش
      </Button>
    </form>
  );
};

export default EditForm;
