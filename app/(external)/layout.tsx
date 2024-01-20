import { redirect, usePathname } from "next/navigation";

import DashNavbar from "@/components/DashNavbar";
import Sidebar from "@/components/Navbar";
import { getPageSession } from "@/auth/lucia";
// import Navbar from "@/components/Navbar";

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { FaHeart } from "react-icons/fa";

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
    <div className="app-negate bg-gradient-to-r from-violet-500 to-fuchsia-500">
      {/* {session ? (<Navbar />) : <></>} */}
      <Navbar isBordered classNames={{
        base: 'bg-fuchsia-100 opacity-70'
      }}>
     
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="bordered" endContent={<FaHeart/>}>
            View Liked Opportunities
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
      <div className="overflow-y-auto w-full max-h-screen h-screen">{children}</div>
    </div>
  );
}
