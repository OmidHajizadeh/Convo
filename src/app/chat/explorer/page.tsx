import Image from "next/image";
import { notFound } from "next/navigation";

import { fetchServerSession } from "@/utils/serverInteractions";
import { fetchRedis } from "@/utils/fetchRedis";
import { Explorer } from "@/lib/Models/Explorer";
import ExplorerListItem from "./_components/ExplorerListItem";
import UserStatus from "./_components/UserStatus";

const ExplorerPage = async () => {
  const session = await fetchServerSession();
  if (!session) notFound();

  let peopleHash: string[];

  try {
    peopleHash = await fetchRedis<string[]>(
      "hgetall",
      "explorer:explorer_list"
    );
  } catch (error) {
    notFound();
  }

  const peopleIds = peopleHash.filter((p, index) => index % 2 === 0);
  const peopleTexts = peopleHash.filter((p, index) => index % 2 === 1);

  let people: User[];

  try {
    people = await Promise.all(
      peopleIds.map(async (item) => {
        const user = await fetchRedis<string>("get", `user:${item}`);
        return JSON.parse(user) as User;
      })
    );
  } catch (error) {
    notFound();
  }

  const explorers: Explorer[] = people
    .map((person, index) => {
      return {
        user: person,
        statusText: peopleTexts[index],
      };
    })
    .filter((explorer) => explorer.user.id !== session.user.id);

  return (
    <div className="h-full p-4">
      <div className="text-center h-full flex flex-col">
        <p>
          شما میتوانید با قرار دادن خود در لیست اکسپلورر، به دیگران اجازه دهید
          به شما درخواست دوستی ارسال کنند.
        </p>

        <UserStatus />

        <hr className="my-4" />
        {explorers.length !== 0 ? (
          <ul className="grid gap-3 md:grid-cols-2">
            {explorers.map((explorer) => {
              return (
                <ExplorerListItem key={explorer.user.id} explorer={explorer} />
              );
            })}
          </ul>
        ) : (
          <div className="flex flex-col items-center overflow-auto">
            <Image
              alt="لیست خالی اکسپلورر"
              src="/empty-explorer.svg"
              width={800}
              height={800}
              referrerPolicy="no-referrer"
              className="max-w-[20rem] w-full"
            />
            <h3 className="text-lg font-medium">
              پروفایلی برای نمایش یافت نشد
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorerPage;
