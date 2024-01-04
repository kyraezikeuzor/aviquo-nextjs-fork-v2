import { getPageSession } from "@/auth/lucia";
import Settings from "./settings";
import Navbar from "@/components/Navbar";

export default async function ProfilePage() {
  const user = (await getPageSession())?.user;

  return (
    <>
      <Settings user={user}></Settings>
    </>
  );
}
