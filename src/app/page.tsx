"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <main className="min-h-screen flex gap-3 flex-col lg:flex-row justify-center lg:justify-evenly items-center overflow-hidden relative bg-landing-wave-lines bg-fixed bg-cover bg-no-repeat bg-center">
      <section>
        <article className="p-4 xl:p-8 mx-4 flex flex-col dark:bg-slate-200/10 gap-3 backdrop-blur-sm w-auto max-w-full rounded-2xl text-center lg:text-start">
          <h1 className="text-7xl font-bold">کانوو</h1>
          <p>وب اپلیکشن چت برای صحبت کردن با دوستان و دوست یابی</p>
          <Button
            component={Link}
            href="/login"
            variant="contained"
            disableElevation
            sx={{
              alignSelf: { xs: "center", lg: "end" },
            }}
            onClick={() => setIsLoading(true)}
          >
            بزن بریم!
            {isLoading && (
              <CircularProgress color="secondary" size={20} className="ms-3" />
            )}
          </Button>
        </article>
      </section>
      <div className="hidden lg:block">
        <Image
          src="/landing-page/phone.webp"
          width={800}
          height={800}
          alt="screenshot"
          className="max-w-[35rem] w-full"
        />
      </div>
    </main>
  );
}
