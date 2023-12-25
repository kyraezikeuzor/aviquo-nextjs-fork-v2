"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

import Logo from "./Logo";
import Link from "next/link";
import Button from "../components/Button";

import Tag from "./Tag";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className={`${styles.nav} z-50 sticky top-0 flex items-center justify-center gap-10 py-3 px-[10vw] w-full backdrop-blur bg-white/50 border-b-2 border-[color:var(--clr-grey-300)]`}
    >
      <div className="flex items-center gap-5">
        <Logo minimal={false} />
      </div>

      <ul className="flex items-center justify-between gap-5 font-medium text-base">
        <li
          className={
            pathname == "/match"
              ? "border-b-2 border-[var(--clr-blue-400)] text-[var(--clr-blue-400)]"
              : "hover:border-b-2 hover:border-[var(--clr-blue-300)]"
          }
        >
          <Link href="/math" className="flex items-center gap-2">
            Get Matched
          </Link>
        </li>
        <li
          className={
            pathname == "/match"
              ? "border-b-2 border-[var(--clr-blue-400)] text-[var(--clr-blue-400)]"
              : "hover:border-b-2 hover:border-[var(--clr-blue-300)]"
          }
        >
          <Link href="/math" className="flex items-center gap-2">
            Get Matched
          </Link>
        </li>
      </ul>

      <ul className="flex items-center justify-between gap-5 font-medium text-base">
        <li
          className={
            pathname == "/match"
              ? "border-b-2 border-[var(--clr-blue-400)] text-[var(--clr-blue-400)]"
              : "hover:border-b-2 hover:border-[var(--clr-blue-300)]"
          }
        >
          <Link href="/math" className="flex items-center gap-2">
            Get Matched
          </Link>
        </li>

        <li>
          <Button type="" size="btn--md" style="btn--primary">
            Sign up
          </Button>
        </li>
      </ul>
    </nav>
  );
}
