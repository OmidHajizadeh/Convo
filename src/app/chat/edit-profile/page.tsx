import { Metadata } from "next";
import { notFound } from "next/navigation";

import { fetchServerSession } from "@/utils/serverInteractions";
import EditForm from "./_components/EditForm";

export const metadata: Metadata = {
  title: "ویرایش پروفایل",
};

export const dynamic = 'force-dynamic';

const EditProfilePage = async () => {
  const session = await fetchServerSession();
  if (!session) notFound();

  return (
    <div className="h-full p-4">
      <EditForm session={session} />
    </div>
  )
}

export default EditProfilePage