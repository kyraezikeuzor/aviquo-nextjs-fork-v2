import { h3 } from "lucia/middleware";
import React from "react";
import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <h3 className={styles.blinking} id="loading">
      Loading...
    </h3>
  );
}
