import Image from "next/image";

const NotFoundPage = () => {
  return (
    <main className="grid place-items-center min-h-screen bg-landing-wave-lines bg-fixed bg-cover bg-no-repeat bg-center">
      <section className="flex flex-col justify-center overflow-auto md:flex-row gap-4 p-5 xl:container w-full relative xl:rounded-2xl dark:bg-gray-900/40 bg-gray-100/30 shadow-xl backdrop-blur-sm h-screen xl:h-[50rem] max-h-screen">
        <div className="md:flex-1 flex flex-col justify-center items-center text-center md:text-start">
          <div>
            <h3 className="text-4xl font-bold dark:text-slate-100">خطای سمت کاربر</h3>
            <p className="mb-8 text-gray-400">دلایل و راه حل های احتمالی:</p>
            <ul className="space-y-8 mt-4">
              <li className="flex flex-col">
                <span className="dark:text-slate-100">ارتباط اینترنتی شما قطع یا ضعیف است</span>
                <span className="text-gray-400 font-light">
                  ارتباط خود را چک کنید
                </span>
              </li>
              <li className="flex flex-col">
                <span className="dark:text-slate-100">اطلاعات کاربری شما دریافت نشده</span>
                <span className="text-gray-400 font-light">
                  صفحه را رفرش کنید
                </span>
              </li>
              <li className="flex flex-col">
                <span className="dark:text-slate-100">نشست کاربری شما منقضی شده</span>
                <span className="text-gray-400 font-light">
                  از حساب کاربری خود خارج شوید و مجدداً ورود کنید
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="md:flex-1 hidden md:grid place-items-center">
          <Image
            src="/not-found.svg"
            width={500}
            height={500}
            alt="login banner"
            placeholder="blur"
            blurDataURL="/login.svg"
            className="w-full aspect-square max-w-[30rem]"
          />
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;
