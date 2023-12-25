import { redirect, usePathname } from "next/navigation";

import DashNavbar from "@/components/DashNavbar";
import Sidebar from "@/components/Sidebar";
import { getPageSession } from "@/auth/lucia";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getPageSession();
  if (!session) redirect("/login");

  return (
    <>
      <Sidebar />
      <main className={`p-0 w-full ml-[var(--w-sidebar)]`}>
        <DashNavbar />
        {children}
      </main>
    </>
  );
}
