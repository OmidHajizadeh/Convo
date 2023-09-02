import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "درباره کانوو",
};

export const dynamic = 'force-dynamic';

const AboutPage = () => {
  return (
    <div className="h-full flex flex-col p-4" dir="ltr">
      <section className="flex flex-col items-center xl:items-start gap-3">
        <code className="flex flex-col sm:flex-row gap-3 items-center">
          <span>App Name</span>
          <span className="rounded-md bg-slate-200/75 py-1 px-2">Convo</span>
        </code>
        <code className="flex flex-col sm:flex-row gap-3 items-center">
          <span>Version</span>
          <span className="rounded-md bg-slate-200/75 py-1 px-2">1.0.0</span>
        </code>
        <code className="flex flex-col sm:flex-row gap-3 items-center">
          <span>Creator</span>
          <span className="rounded-md bg-slate-200/75 py-1 px-2">
            Omid Hajizadeh
          </span>
        </code>
        <code className="flex flex-col sm:flex-row gap-3 items-center">
          <span>Contact Info</span>
          <Link
            className="rounded-md bg-slate-200/75 py-1 px-2"
            href="mailto:omid.hajizadehh@gmail.com"
          >
            omid.hajizadehh@gmail.com
          </Link>
        </code>
      </section>
      <section className="mt-auto">
        <code className="mb-3 block text-center xl:text-start">Powered By</code>
        <ul className="flex flex-wrap justify-center xl:justify-start gap-3 overflow-auto">
          <li
            className="flex-shrink-0 w-20 h-20 bg-slate-300/30 hover:bg-orange-200/30 transition-all duration-300 rounded-xl backdrop-blur-sm"
            title="NextJS 13"
          >
            <Link
              href="https://nextjs.org/"
              prefetch={false}
              className="grid place-items-center h-full w-full p-3"
            >
              <Image
                className="w-auto max-h-full object-cover"
                src="/packages/nextjs.webp"
                blurDataURL="/packages/nextjs.webp"
                width={300}
                height={300}
                placeholder="blur"
                alt="nextjs"
              />
            </Link>
          </li>
          <li
            className="flex-shrink-0 w-20 h-20 bg-slate-300/30 hover:bg-orange-200/30 transition-all duration-300 rounded-xl backdrop-blur-sm"
            title="NextAuth"
          >
            <Link
              href="https://next-auth.js.org/"
              prefetch={false}
              className="grid place-items-center h-full w-full p-3"
            >
              <Image
                className="w-auto max-h-full object-cover"
                src="/packages/nextauth.webp"
                blurDataURL="/packages/nextauth.webp"
                width={300}
                height={300}
                placeholder="blur"
                alt="nextauth"
              />
            </Link>
          </li>
          <li
            className="flex-shrink-0 w-20 h-20 bg-slate-300/30 hover:bg-orange-200/30 transition-all duration-300 rounded-xl backdrop-blur-sm"
            title="Material UI"
          >
            <Link
              href="https://mui.com/"
              prefetch={false}
              className="grid place-items-center h-full w-full p-3"
            >
              <Image
                className="w-auto max-h-full object-cover"
                src="/packages/mui.webp"
                blurDataURL="/packages/mui.webp"
                width={300}
                height={300}
                placeholder="blur"
                alt="mui"
              />
            </Link>
          </li>
          <li
            className="flex-shrink-0 w-20 h-20 bg-slate-300/30 hover:bg-orange-200/30 transition-all duration-300 rounded-xl backdrop-blur-sm"
            title="TailwindCSS"
          >
            <Link
              href="https://tailwindcss.com/"
              prefetch={false}
              className="grid place-items-center h-full w-full p-3"
            >
              <Image
                className="w-auto max-h-full object-cover"
                src="/packages/tailwindcss.webp"
                blurDataURL="/packages/tailwindcss.webp"
                width={300}
                height={300}
                placeholder="blur"
                alt="tailwindcss"
              />
            </Link>
          </li>
          <li
            className="flex-shrink-0 w-20 h-20 bg-slate-300/30 hover:bg-orange-200/30 transition-all duration-300 rounded-xl backdrop-blur-sm"
            title="TypeScript"
          >
            <Link
              href="https://www.typescriptlang.org/"
              prefetch={false}
              className="grid place-items-center h-full w-full p-3"
            >
              <Image
                className="w-auto max-h-full object-cover"
                src="/packages/typescript.webp"
                blurDataURL="/packages/typescript.webp"
                width={300}
                height={300}
                placeholder="blur"
                alt="typescript"
              />
            </Link>
          </li>
          <li
            className="flex-shrink-0 w-20 h-20 bg-slate-300/30 hover:bg-orange-200/30 transition-all duration-300 rounded-xl backdrop-blur-sm"
            title="Upstash"
          >
            <Link
              href="https://upstash.com/"
              prefetch={false}
              className="grid place-items-center h-full w-full p-3"
            >
              <Image
                className="w-auto max-h-full object-cover"
                src="/packages/upstash.webp"
                blurDataURL="/packages/upstash.webp"
                width={300}
                height={300}
                placeholder="blur"
                alt="upstash"
              />
            </Link>
          </li>
          <li
            className="flex-shrink-0 w-20 h-20 bg-slate-300/30 hover:bg-orange-200/30 transition-all duration-300 rounded-xl backdrop-blur-sm"
            title="Redis"
          >
            <Link
              href="https://redis.io/"
              prefetch={false}
              className="grid place-items-center h-full w-full p-3"
            >
              <Image
                className="w-auto max-h-full object-cover"
                src="/packages/redis.webp"
                blurDataURL="/packages/redis.webp"
                width={300}
                height={300}
                placeholder="blur"
                alt="redis"
              />
            </Link>
          </li>
          <li
            className="flex-shrink-0 w-20 h-20 bg-slate-300/30 hover:bg-orange-200/30 transition-all duration-300 rounded-xl backdrop-blur-sm"
            title="Redux Toolkit"
          >
            <Link
              href="https://redux-toolkit.js.org/"
              prefetch={false}
              className="grid place-items-center h-full w-full p-3"
            >
              <Image
                className="w-auto max-h-full object-cover"
                src="/packages/redux.webp"
                blurDataURL="/packages/redux.webp"
                width={300}
                height={300}
                placeholder="blur"
                alt="redux"
              />
            </Link>
          </li>
          <li
            className="flex-shrink-0 w-20 h-20 bg-slate-300/30 hover:bg-orange-200/30 transition-all duration-300 rounded-xl backdrop-blur-sm"
            title="Pusher"
          >
            <Link
              href="https://pusher.com/"
              prefetch={false}
              className="grid place-items-center h-full w-full p-3"
            >
              <Image
                className="w-auto max-h-full object-cover"
                src="/packages/pusher.webp"
                blurDataURL="/packages/pusher.webp"
                width={300}
                height={300}
                placeholder="blur"
                alt="pusher"
              />
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default AboutPage;
