import { fetchServerSession } from "@/utils/serverInteractions";
import { notFound } from "next/navigation";
import EditForm from "./_components/EditForm";

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