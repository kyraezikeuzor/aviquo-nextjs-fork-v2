import React, { useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SearchProps = {
  searchFunction: React.Dispatch<React.SetStateAction<any>>; //SetSearchFunction's type is a useState hook
  placeholder: string;
};

const SearchBar = ({ searchFunction, placeholder }: SearchProps) => {
  return (
    <div className="flex items-center gap-2 px-4 py-1 rounded-2xl w-full border border-[var(--clr-grey-300)] bg-[#fff]">
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="w-4 text-[var(--clr-grey-400)]"
      />
      <input
        onChange={(e) => searchFunction(e.target.value)}
        className="outline-none w-full font-normal text-base md:text-10 lg:text-12 text-[var(--clr-grey-400)] placeholder-[var(--clr-grey-400)]"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
