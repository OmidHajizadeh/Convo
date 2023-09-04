import { Metadata } from "next";
import { notFound } from "next/navigation";

import { fetchServerSession } from "@/utils/serverInteractions";
import EditForm from "./_components/EditForm";
import PageFrame from "@/components/PageFrame";

export const metadata: Metadata = {
  title: "ویرایش پروفایل",
};

const EditProfilePage = async () => {
  const session = await fetchServerSession();
  if (!session) notFound();

  return (
    <PageFrame>
      <EditForm session={session} />
    </PageFrame>
  )
}

export default EditProfilePage