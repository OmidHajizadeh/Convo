"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useState } from "react";

import { Button, TextField } from "@/lib/Material/MaterialClientComponents";
import { EditIcon } from "@/lib/Material/MaterialClientIcons";

type EditFormProps = {
  session: Session;
};

type EditFormData = {
  name: string;
};

const EditForm = ({ session }: EditFormProps) => {
  const { register, handleSubmit, formState, setError } = useForm<EditFormData>(
    {
      defaultValues: {
        name: session.user.name,
      },
    }
  );

  const { errors, isSubmitting } = formState;
  const router = useRouter();
  const [name, setName] = useState(session.user.name);

  async function submitProfileHandler(formData: EditFormData) {
    if (isSubmitting) return;
    if (name === session.user.name) {
      setError("name", { message: "اسمی تغییری نداشته است" });
      return;
    }
    try {
      toast.loading("در حال ارسال درخواست...", { id: "edit-profile" });
      const res = await fetch("/api/edit-profile", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
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
      toast.dismiss("edit-profile");
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(submitProfileHandler)}
      className="grid sm:grid-cols-2 gap-3 mt-4"
    >
      <TextField
        label="اسم نمایشی"
        variant="standard"
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
        className="w-full"
      />
      <span></span>
      <div>
        <Button
          type="submit"
          disableElevation
          variant="contained"
          startIcon={<EditIcon />}
        >
          ویرایش
        </Button>
      </div>
    </form>
  );
};

export default EditForm;
