import { getPageSession } from "@/auth/lucia";
import Profile from "./profile";
import Navbar from "@/components/Navbar";

import { UserInterface } from "@/auth/lucia";
import { useRouter } from "next/navigation";

export default async function ProfilePage() {
  const user: (UserInterface & { userId: string }) | undefined = (
    await getPageSession()
  )?.user;

  const router = useRouter();

  if (!user) router.push("/auth?l");
  else
    return (
      <>
        <Profile user={user}></Profile>
      </>
    );
}
