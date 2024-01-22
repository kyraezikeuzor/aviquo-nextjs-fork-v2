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
    <div className="h-screen max-h-screen overflow-hidden app-negate bg-gradient-to-tr from-fuchsia-200 to-purple-400">
      {/* {session ? (<Navbar />) : <></>} */}
      <div className="w-full h-screen max-h-screen overflow-hidden">
        {children}
      </div>
    </div>
  );
}
