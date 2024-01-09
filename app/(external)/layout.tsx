import { redirect, usePathname } from "next/navigation";

import DashNavbar from "@/components/DashNavbar";
import Sidebar from "@/components/Navbar";
import { getPageSession } from "@/auth/lucia";
import Navbar from "@/components/Navbar";

export default async function ExternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getPageSession();
  if (session) {
    if (
      session.user.username == "" ||
      session.user.firstName == "" ||
      session.user.lastName == ""
    )
      redirect("/onboarding");
  }

  return (
    <div className="app">
      {session ? (<Navbar />) : <></>}
      <div className="overflow-y-auto w-full max-h-screen h-screen pt-[3.5%]">{children}</div>
    </div>
  );
}
