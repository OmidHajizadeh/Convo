"use client";

import { useState } from "react";
import Image from "next/image";

import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

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
      <section className="grid lg:grid-cols-2 justify-center overflow-auto lg:flex-row gap-4 p-5 xl:container w-full relative xl:rounded-2xl bg-slate-100/20 shadow-xl backdrop-blur-sm h-screen xl:h-[90vh] max-h-screen">
        <div className="lg:flex-1 flex flex-col justify-center items-center text-center">
          <h3 className="text-4xl sm:text-6xl font-bold mb-8">ورود به کانوو</h3>
          <p className="mb-4">با استفاده از یکی از سرویس های زیر وارد شوید</p>
          <div className="w-full max-w-[30rem]">
            <Button
              disabled={isLoading}
              onClick={signInHandler.bind(null, "google")}
              variant="contained"
              endIcon={<GoogleIcon />}
              disableElevation
              sx={{
                width: "100%",
                paddingBlock: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <span className="relative top-[2px]">Google</span>
            </Button>
            <Button
              disabled={isLoading}
              onClick={signInHandler.bind(null, "github")}
              variant="contained"
              endIcon={<GitHubIcon />}
              disableElevation
              sx={{ width: "100%", paddingBlock: "0.75rem" }}
            >
              <span className="relative top-[2px]">Github</span>
            </Button>
          </div>
        </div>
        <div className="lg:flex-1 hidden lg:grid place-items-center">
          <Image
            src="/login.svg"
            width={500}
            height={500}
            alt="login banner"
            placeholder="blur"
            blurDataURL="/login.svg"
            className="w-full"
          />
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
