import { redirect, usePathname } from "next/navigation";

import DashNavbar from "@/components/DashNavbar";
import Sidebar from "@/components/Navbar";
import { getPageSession } from "@/auth/lucia";
// import Navbar from "@/components/Navbar";



export default async function ExternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getPageSession();
  // if (session) {
  //   if (
  //     session.user.username == "" ||
  //     session.user.firstName == "" ||
  //     session.user.lastName == ""
  //   )
  //     redirect("/onboarding");
  // }

  return (
    <div className="app-negate bg-gradient-to-r from-violet-500 to-fuchsia-500 max-h-screen h-screen overflow-hidden">
      {/* {session ? (<Navbar />) : <></>} */}
      <div className="overflow-hidden w-full max-h-screen h-screen">{children}</div>
    </div>
  );
}
