import { getPageSession } from "@/auth/lucia";
import Likes from "./likes";

export default async function ForumPage() {
  const user = (await getPageSession())?.user;
  // console.log(user);

  return <Likes></Likes>
}
