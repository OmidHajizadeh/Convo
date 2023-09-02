import { Metadata } from "next";
import { notFound } from "next/navigation";

import RequestsList from "./_components/RequestsList";
import { fetchServerSession } from "@/utils/serverInteractions";

export const metadata: Metadata = {
  title: "درخواست ها",
};

export const revalidate = 0;


const RequestsPage = async () => {
  const session = await fetchServerSession();
  if (!session) notFound();

  return (
    <div className="p-4 h-full">
      <RequestsList />
    </div>
  );
};

export default RequestsPage;
