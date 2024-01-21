"use client";
import React from "react";
import styles from "./Tag.module.css";

type TagTypes = {
  children: React.ReactNode;
  type: string;
  className?: string;
};

export const Tag = ({ children, type, className }: TagTypes) => {
  return <div className={`${styles.tag} ${styles[type]} ${className ? className : ''}`}>{children}</div>;
};

export default Tag;
