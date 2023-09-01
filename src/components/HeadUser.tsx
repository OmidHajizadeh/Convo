import Image from "next/image";

type HeadUserProps = {
  session: Session;
};

const HeadUser = async ({ session }: HeadUserProps) => {
  return (
    <article className="flex items-center">
      <figure className="shrink-0 me-3">
        <Image
          alt={session.user.name!}
          src={session.user.image!}
          width={400}
          height={400}
          className="w-16 h-16 rounded-full"
        />
      </figure>
      <div className="grow-1 shrink-1 flex justify-between items-center w-full">
        <span>
          <h1 className="text-2xl font-bold">{session.user.name}</h1>
          <small className="truncate">{session.user.email}</small>
        </span>
      </div>
      <span className="sr-only">پروفایل شما</span>
    </article>
  );
};

export default HeadUser;
