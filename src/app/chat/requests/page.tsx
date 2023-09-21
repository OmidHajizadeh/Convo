import { Metadata } from "next";
import { notFound } from "next/navigation";

import RequestsList from "./_components/RequestsList";
import { fetchServerSession } from "@/utils/serverInteractions";
import PageFrame from "@/components/PageFrame";

export const metadata: Metadata = {
  title: "درخواست ها",
};

const RequestsPage = async () => {
  const session = await fetchServerSession();
  
  if (!session) notFound();
  
  return (
    <PageFrame>
      <RequestsList />
    </PageFrame>
  );
};

export default RequestsPage;
