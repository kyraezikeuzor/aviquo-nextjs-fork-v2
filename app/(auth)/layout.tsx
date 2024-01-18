import { redirect, usePathname } from "next/navigation";

import DashNavbar from "@/components/DashNavbar";
import Sidebar from "@/components/Navbar";
import { getPageSession } from "@/auth/lucia";
import Navbar from "@/components/Navbar";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  redirect('/discover');
  // const session = await getPageSession();
  // if (!session) redirect("/auth");

  // console.log(session.user);
  // console.log("reach");

  // if (
  //   session.user.username == "" ||
  //   session.user.firstName == "" ||
  //   session.user.lastName == ""
  // )
  //   redirect("/onboarding");

  // return (
  //   <div className="app">
  //     <Navbar />
  //     <div className="overflow-y-auto w-full max-h-screen h-full pt-[3.5%]">{children}</div>
  //   </div>
  // );
}
