"use client";

import { Box, Grid, colors } from "@mui/material";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Router, { useRouter } from "next/navigation";

import assets from "@/assets";
import SigninForm from "./SignInForm";
import SignupForm from "./SignUpForm";

import styles from "./page.module.css";

import clsx from "clsx";

export const ScreenMode = {
  SIGN_IN: "SIGN_IN",
  SIGN_UP: "SIGN_UP",
};

const { SIGN_IN, SIGN_UP } = ScreenMode;

const SigninPage = () => {
  const router = useRouter();

  const [backgroundImage, setBackgroundImage] = useState(
    assets.images.signinBg
  );

  const loginPage = typeof useSearchParams().get("l") == "string";

  const [currMode, setCurrMode] = useState(loginPage ? SIGN_IN : SIGN_UP);
  const [currAnim, setCurrAnim] = useState("none");
  const [animLock, setAnimLock] = useState(false);

  const onSwitchMode = (mode: "SIGN_IN" | "SIGN_UP") => {
    if (animLock) {
      return;
    }

    setCurrAnim("none");
    setCurrAnim(styles.slide);
    setAnimLock(true);

    const timeout1 = setTimeout(() => {
      setCurrMode(mode);
      setBackgroundImage(
        mode === SIGN_IN ? assets.images.signinBg : assets.images.signupBg
      );

      router.push(mode === "SIGN_IN" ? "/auth?l" : "/auth");
    }, 1000);

    const timeout2 = setTimeout(() => {
      setAnimLock(false);
      setCurrAnim("none");
    }, 2000);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      setAnimLock(false);
    };
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item xs={5} sx={{ position: "relative", padding: 3 }}>
        {currMode === ScreenMode.SIGN_IN ? (
          <SigninForm onSwitchMode={onSwitchMode} />
        ) : (
          <SignupForm onSwitchMode={onSwitchMode} />
        )}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            height: "100%",
            backgroundImage: `url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3wxNTE5NjQ4fHxlbnwwfHx8fHw%3D)`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            animationName: currAnim,
            animationDuration: "2s",
            animationTimingFunction: "ease-in-out",
          }}
        />
      </Grid>
      <Grid
        item
        xs={7}
        sx={{
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            width: `100%`,
            height: "100%",
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            transition: "all 1s ease-out",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default SigninPage;
