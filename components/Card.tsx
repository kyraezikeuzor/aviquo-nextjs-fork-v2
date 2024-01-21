import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: CardProps) => {
  return (
    <div className={`border-2 border-[var(--clr-grey-300)] bg-[#fff] rounded-xl p-4 font-normal flex flex-col gap-2 ${className ? className : ''}`}>
      {children}
    </div>
  );
};

export default Card;
