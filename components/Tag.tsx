"use client";
import React from "react";
import styles from "./Tag.module.css";

type TagTypes = {
  children: React.ReactNode;
  type: string;
};

export const Tag = ({ children, type }: TagTypes) => {
  return <div className={`${styles.tag} ${styles[type]}`}>{children}</div>;
};

export default Tag;
