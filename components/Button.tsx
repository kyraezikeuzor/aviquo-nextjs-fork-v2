import React from "react";
import Link from "next/link";
import styles from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  type: "btn--submit" | "btn--header" | "";
  path?: string;
  style: "btn--primary" | "btn--secondary";
  size: "btn--sm" | "btn--md" | "btn--lg";
};

export const Button = ({ children, type, path, style, size }: ButtonProps) => {
  return (
    <div>
      {path ? (
        <Link
          href={path}
          className={`${styles.btn} ${styles[type]} ${styles[style]}  ${styles[size]}`}
        >
          <button>{children}</button>
        </Link>
      ) : (
        <button
          className={`${styles.btn} ${styles[type]} ${styles[style]} ${styles[size]}`}
        >
          {children}
        </button>
      )}
    </div>
  );
};

export default Button;
