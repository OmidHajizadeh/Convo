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
      name: "NextJS v13.4.19",
      href: "https://nextjs.org/",
      image: "/packages/nextjs.webp",
    },
    {
      name: "React v18.2.0",
      href: "https://react.dev/",
      image: "/packages/react.webp",
    },
    {
      name: "NextAuth v4.23.0",
      href: "https://next-auth.js.org/",
      image: "/packages/nextauth.webp",
    },
    {
      name: "Material UI v5.9.1",
      href: "https://mui.com/",
      image: "/packages/mui.webp",
    },
    {
      name: "TailwindCSS v3.3.3",
      href: "https://tailwindcss.com/",
      image: "/packages/tailwindcss.webp",
    },
    {
      name: "TypeScript v5.1.6",
      href: "https://www.typescriptlang.org/",
      image: "/packages/typescript.webp",
    },
    {
      name: "Upstash v3.0.4",
      href: "https://upstash.com/",
      image: "/packages/upstash.webp",
    },
    {
      name: "Redis v1.22.0",
      href: "https://redis.io/",
      image: "/packages/redis.webp",
    },
    {
      name: "Redux Toolkit v1.9.5",
      href: "https://redux-toolkit.js.org/",
      image: "/packages/redux.webp",
    },
    {
      name: "Pusher v5.1.3",
      href: "https://pusher.com/",
      image: "/packages/pusher.webp",
    },
    {
      name: "Couldinary v4.22.0",
      href: "https://cloudinary.com/",
      image: "/packages/couldinary.webp",
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
