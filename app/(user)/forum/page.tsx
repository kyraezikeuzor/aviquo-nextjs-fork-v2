//here for getting user

import { getPageSession } from "@/auth/lucia";
import Forum from "./forum";
import Navbar from "@/components/Navbar";

export default async function ForumPage() {
  const user = (await getPageSession())?.user;

  return (
    <>
      <Forum user={user}></Forum>
    </>
  );
}
