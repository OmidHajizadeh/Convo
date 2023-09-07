import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import PageFrame from "@/components/PageFrame";

export const metadata: Metadata = {
  title: "درباره کانوو",
};

type Stack = {
  href: string;
  image: string;
  name: string;
};

const AboutPage = () => {
  const stacks: Stack[] = [
    {
      name: "NextJS 13",
      href: "https://nextjs.org/",
      image: "/packages/nextjs.webp",
    },
    {
      name: "NextAuth",
      href: "https://next-auth.js.org/",
      image: "/packages/nextauth.webp",
    },
    {
      name: "Material UI",
      href: "https://mui.com/",
      image: "/packages/mui.webp",
    },
    {
      name: "TailwindCSS",
      href: "https://tailwindcss.com/",
      image: "/packages/tailwindcss.webp",
    },
    {
      name: "TypeScript",
      href: "https://www.typescriptlang.org/",
      image: "/packages/typescript.webp",
    },
    {
      name: "Upstash",
      href: "https://upstash.com/",
      image: "/packages/upstash.webp",
    },
    {
      name: "Redis",
      href: "https://redis.io/",
      image: "/packages/redis.webp",
    },
    {
      name: "Redux Toolkit",
      href: "https://redux-toolkit.js.org/",
      image: "/packages/redux.webp",
    },
    {
      name: "Pusher",
      href: "https://pusher.com/",
      image: "/packages/pusher.webp",
    },
  ];

  return (
    <PageFrame className="flex flex-col" dir="ltr">
      <section className="flex flex-col items-center xl:items-start gap-3">
        <code className="flex flex-col sm:flex-row gap-3 items-center">
          <span className="dark:text-slate-200">App Name</span>
          <span className="rounded-md bg-slate-200/75 dark:text-black py-1 px-2">
            Convo
          </span>
        </code>
        <code className="flex flex-col sm:flex-row gap-3 items-center">
          <span className="dark:text-slate-200">Version</span>
          <span className="rounded-md bg-slate-200/75 dark:text-black py-1 px-2">
            1.0.0
          </span>
        </code>
        <code className="flex flex-col sm:flex-row gap-3 items-center">
          <span className="dark:text-slate-200">Creator</span>
          <span className="rounded-md bg-slate-200/75 dark:text-black py-1 px-2">
            Omid Hajizadeh
          </span>
        </code>
        <code className="flex flex-col sm:flex-row gap-3 items-center">
          <span className="dark:text-slate-200">Contact Info</span>
          <Link
            className="rounded-md bg-slate-200/75 dark:text-black py-1 px-2"
            href="mailto:omid.hajizadehh@gmail.com"
          >
            omid.hajizadehh@gmail.com
          </Link>
        </code>
      </section>
      <section className="mt-auto">
        <code className="mb-3 block dark:text-slate-200 text-center xl:text-start">
          Powered By
        </code>
        <ul className="flex flex-wrap justify-center xl:justify-start gap-3 overflow-auto">
          {stacks.map((stack) => {
            return (
              <li
                key={stack.name}
                className="flex-shrink-0 p-3 w-20 h-20 bg-slate-300/30 hover:bg-orange-200/30 transition-all duration-300 rounded-xl backdrop-blur-sm"
                title={stack.name}
              >
                <Link
                  href={stack.href}
                  prefetch={false}
                  className="grid place-items-center h-full w-full relative p-3"
                >
                  <Image
                    className="w-auto max-h-full object-contain"
                    src={stack.image}
                    blurDataURL={stack.image}
                    fill
                    placeholder="blur"
                    alt={stack.name}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </PageFrame>
  );
};

export default AboutPage;
