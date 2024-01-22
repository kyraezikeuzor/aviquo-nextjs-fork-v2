import { getPageSession } from "@/auth/lucia";
import Profile from "./profile";
import Navbar from "@/components/Navbar";

import { UserInterface } from "@/auth/lucia";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user: (UserInterface & { userId: string }) | undefined = (
    await getPageSession()
  )?.user;

  if (!user) redirect("/auth?l");
  else
    return (
      <>
        <Profile user={user}></Profile>
      </>
    );
}
