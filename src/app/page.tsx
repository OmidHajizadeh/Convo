import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="min-h-screen flex gap-3 flex-col md:flex-row justify-center md:justify-evenly items-center overflow-hidden relative bg-landing-wave-lines bg-fixed bg-cover bg-no-repeat bg-center">
      <section>
        <article className="p-4 xl:p-8 flex flex-col gap-3 backdrop-blur-sm w-auto max-w-full rounded-2xl text-center md:text-start">
          <h1 className="text-7xl font-bold">کانوو</h1>
          <p>وب اپلیکشن چت برای صحبت کردن با دوستان و دوست یابی</p>
          <Button
            component={Link}
            href="/login"
            variant="contained"
            disableElevation
            className="self-center md:self-end"
          >
            بزن بریم!
          </Button>
        </article>
      </section>
      <div>
        <Image
          src="/landing-page/phone.webp"
          width={800}
          height={800}
          alt="screenshot"
          className="max-w-[35rem] w-full"
          placeholder="blur"
          blurDataURL="/landing-page/phone.webp"
        />
      </div>
    </main>
  );
}
