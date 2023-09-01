import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="min-h-screen flex gap-3 flex-col md:flex-row justify-start md:justify-evenly items-center overflow-hidden relative bg-landing-wave-lines bg-fixed bg-cover bg-no-repeat bg-center">
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
          src="/landing-page/phone.png"
          width={800}
          height={800}
          alt="screenshot"
          className="max-w-[35rem] w-full"
        />
      </div>
      <div className="absolute bottom-0 overflow-auto p-3 left-1/2 -translate-x-1/2 max-w-full">
          <ul className="flex gap-3 overflow-auto">
            <li className="flex-shrink-0 w-20 h-20 bg-orange-300/30 hover:bg-orange-200/30 transition-all duration-500 rounded-xl backdrop-blur-sm" title="nextjs">
              <Link href="https://nextjs.org/" prefetch={false} className="grid place-items-center h-full w-full p-3">
                <Image
                  className="w-auto max-h-full"
                  src="/landing-page/packages/nextjs.webp"
                  blurDataURL="/landing-page/packages/nextjs.webp"
                  width={300}
                  height={300}
                  placeholder="blur"
                  alt="nextjs"
                />
              </Link>
            </li>
            <li className="flex-shrink-0 w-20 h-20 bg-orange-300/30 hover:bg-orange-200/30 transition-all duration-500 rounded-xl backdrop-blur-sm" title="nextauth">
              <Link href="https://next-auth.js.org/" prefetch={false} className="grid place-items-center h-full w-full p-3">
                <Image
                  className="w-auto max-h-full"
                  src="/landing-page/packages/nextauth.webp"
                  blurDataURL="/landing-page/packages/nextauth.webp"
                  width={300}
                  height={300}
                  placeholder="blur"
                  alt="nextauth"
                />
              </Link>
            </li>
            <li className="flex-shrink-0 w-20 h-20 bg-orange-300/30 hover:bg-orange-200/30 transition-all duration-500 rounded-xl backdrop-blur-sm" title="mui">
              <Link href="https://mui.com/" prefetch={false} className="grid place-items-center h-full w-full p-3">
                <Image
                  className="w-auto max-h-full"
                  src="/landing-page/packages/mui.webp"
                  blurDataURL="/landing-page/packages/mui.webp"
                  width={300}
                  height={300}
                  placeholder="blur"
                  alt="mui"
                />
              </Link>
            </li>
            <li className="flex-shrink-0 w-20 h-20 bg-orange-300/30 hover:bg-orange-200/30 transition-all duration-500 rounded-xl backdrop-blur-sm" title="tailwindcss">
              <Link href="https://tailwindcss.com/" prefetch={false} className="grid place-items-center h-full w-full p-3">
                <Image
                  className="w-auto max-h-full"
                  src="/landing-page/packages/tailwindcss.webp"
                  blurDataURL="/landing-page/packages/tailwindcss.webp"
                  width={300}
                  height={300}
                  placeholder="blur"
                  alt="tailwindcss"
                />
              </Link>
            </li>
            <li className="flex-shrink-0 w-20 h-20 bg-orange-300/30 hover:bg-orange-200/30 transition-all duration-500 rounded-xl backdrop-blur-sm" title="typescript">
              <Link href="https://www.typescriptlang.org/" prefetch={false} className="grid place-items-center h-full w-full p-3">
                <Image
                  className="w-auto max-h-full"
                  src="/landing-page/packages/typescript.webp"
                  blurDataURL="/landing-page/packages/typescript.webp"
                  width={300}
                  height={300}
                  placeholder="blur"
                  alt="typescript"
                />
              </Link>
            </li>
            <li className="flex-shrink-0 w-20 h-20 bg-orange-300/30 hover:bg-orange-200/30 transition-all duration-500 rounded-xl backdrop-blur-sm" title="upstash">
              <Link href="https://upstash.com/" prefetch={false} className="grid place-items-center h-full w-full p-3">
                <Image
                  className="w-auto max-h-full"
                  src="/landing-page/packages/upstash.webp"
                  blurDataURL="/landing-page/packages/upstash.webp"
                  width={300}
                  height={300}
                  placeholder="blur"
                  alt="upstash"
                />
              </Link>
            </li>
            <li className="flex-shrink-0 w-20 h-20 bg-orange-300/30 hover:bg-orange-200/30 transition-all duration-500 rounded-xl backdrop-blur-sm" title="redis">
              <Link href="https://redis.io/" prefetch={false} className="grid place-items-center h-full w-full p-3">
                <Image
                  className="w-auto max-h-full"
                  src="/landing-page/packages/redis.webp"
                  blurDataURL="/landing-page/packages/redis.webp"
                  width={300}
                  height={300}
                  placeholder="blur"
                  alt="redis"
                />
              </Link>
            </li>
            <li className="flex-shrink-0 w-20 h-20 bg-orange-300/30 hover:bg-orange-200/30 transition-all duration-500 rounded-xl backdrop-blur-sm" title="redux">
              <Link href="https://redux-toolkit.js.org/" prefetch={false} className="grid place-items-center h-full w-full p-3">
                <Image
                  className="w-auto max-h-full"
                  src="/landing-page/packages/redux.webp"
                  blurDataURL="/landing-page/packages/redux.webp"
                  width={300}
                  height={300}
                  placeholder="blur"
                  alt="redux"
                />
              </Link>
            </li>
          </ul>
        </div>
    </main>
  );
}
