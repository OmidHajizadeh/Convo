"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import Image from "next/image";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  async function signInHandler(method: string) {
    setIsLoading(true);
    try {
      await signIn(method, {
        redirect: true,
        callbackUrl: "/",
      });
    } catch (err) {
      toast.error("خطایی رخ داد. دوباره امتحان کنید");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="grid place-items-center min-h-screen bg-landing-wave-lines bg-fixed bg-cover bg-no-repeat bg-center">
      <section className="flex flex-col overflow-auto md:flex-row gap-4 p-5 xl:container w-full relative xl:rounded-2xl bg-slate-100/20 shadow-xl backdrop-blur-sm h-screen xl:h-[50rem] max-h-screen">
        <div className="flex-1 flex flex-col justify-center items-center">
          <h3 className="text-6xl font-bold mb-8">ورود به کانوو</h3>
          <p className="mb-4">با استفاده از یکی از سرویس های زیر وارد شوید</p>
          <div>
            <Button
              disabled={isLoading}
              onClick={signInHandler.bind(null, "google")}
              variant="contained"
              endIcon={<GoogleIcon />}
              disableElevation
              className="w-full !py-3 !mb-4"
            >
              Google
            </Button>
            <Button
              disabled={isLoading}
              onClick={signInHandler.bind(null, "github")}
              variant="contained"
              endIcon={<GitHubIcon />}
              disableElevation
              className="w-full !py-3"
            >
              Github
            </Button>
          </div>
        </div>
        <div className="flex-1 grid place-items-center">
          <Image
            src="/login.svg"
            width={500}
            height={500}
            alt="login banner"
            placeholder="blur"
            blurDataURL="/login.svg"
            className="w-full aspect-square max-h-full"
          />
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
