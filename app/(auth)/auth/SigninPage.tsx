"use client";

import { Box, Grid, colors } from "@mui/material";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

import assets from "@/assets";
import SigninForm from "./SignInForm";
import SignupForm from "./SignUpForm";

export const ScreenMode = {
  SIGN_IN: "SIGN_IN",
  SIGN_UP: "SIGN_UP",
};

const { SIGN_IN, SIGN_UP } = ScreenMode;

const SigninPage = () => {
  const [left, setLeft] = useState<string | number>(0);
  const [right, setRight] = useState<string | number>("unset");
  const [width, setWidth] = useState(0);

  const [backgroundImage, setBackgroundImage] = useState(
    assets.images.signinBg
  );

  const loginPage = typeof useSearchParams().get("l") == "string";

  const [currMode, setCurrMode] = useState(loginPage ? SIGN_IN : SIGN_UP);

  const onSwitchMode = (mode: any) => {
    setWidth(100);

    const timeout1 = setTimeout(() => {
      setCurrMode(mode);
      setBackgroundImage(
        mode === SIGN_IN ? assets.images.signinBg : assets.images.signupBg
      );
    }, 1000);

    const timeout2 = setTimeout(() => {
      setLeft("unset");
      setRight(0);
      setWidth(0);
    }, 1100);

    const timeout3 = setTimeout(() => {
      setRight("unset");
      setLeft(0);
    }, 2500);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
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
            left: left,
            right: right,
            width: `${width}%`,
            height: "100%",
            backgroundImage: `url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3wxNTE5NjQ4fHxlbnwwfHx8fHw%3D)`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            transition: "all 1s ease-in",
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
            left: left,
            right: right,
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
