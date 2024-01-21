import { redirect, usePathname } from "next/navigation";

import DashNavbar from "@/components/DashNavbar";
import Sidebar from "@/components/Navbar";
import { UserInterface, getPageSession } from "@/auth/lucia";
import Navbar from "@/components/Navbar";
import Onboarding from "./(onboarding)/onboarding";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getPageSession();
  if (!session) redirect("/auth?l");

  return (
    <div className="app">
      <Navbar />
      <div className="overflow-y-auto w-full max-h-screen h-full pt-[3.5%]">
        {children}
      </div>

      {!session.user.username && <Onboarding user={session.user} />}
    </div>
  );
}
