import React from "react";
import Link from "next/link";

type LogoProps = {
  minimal?: true | false;
};

const Logo = ({ minimal }: LogoProps) => {
  return (
    <Link
      href="/"
      className={`flex items-center justify-center gap-2 font-semibold w-fit`}
    >
      <img
        src="/aviquo_logo.png"
        className="w-2 md:w-4 lg:w-6 rounded-md"
      />
      {!minimal && <p className={`text-md md:text-lg lg:text-lg`}>Aviquo</p>}
    </Link>
  );
};

export default Logo;
