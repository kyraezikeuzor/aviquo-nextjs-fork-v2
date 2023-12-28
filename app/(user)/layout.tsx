import { redirect, usePathname } from "next/navigation";

import DashNavbar from "@/components/DashNavbar";
import Sidebar from "@/components/Navbar";
import { getPageSession } from "@/auth/lucia";
import Navbar from "@/components/Navbar";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getPageSession();
  if (!session) redirect("/login");

  return (
    <div className='app'>
      <Navbar />
      <div className="overflow-y-auto w-4/5 max-h-screen">
        {children}
      </div>
    </div>
  );
}
