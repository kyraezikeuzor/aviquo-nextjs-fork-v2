"use client";
import React, { useState } from "react";

import Icon from "./Icon";

type ToggleProps = {
  toggleStatus: true | false;
};

const Toggle = ({ toggleStatus }: ToggleProps) => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  toggleStatus = click;

  return (
    <div
      onClick={handleClick}
      className="bg-[var(--clr-purple-500)] rounded-2xl"
    >
      {toggleStatus && (
        <div className="w-16 h-fit-content flex flex-row relative">
          <div className="ml-8">
            <Icon icon="circle-checked" fillColor="white" />
          </div>
        </div>
      )}

      {!toggleStatus && (
        <div className="w-16 h-fit-content">
          <Icon icon="circle-x" fillColor="white" />
        </div>
      )}
    </div>
  );
};

export default Toggle;
