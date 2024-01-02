import { Button, Stack, TextField, Typography, colors } from "@mui/material";
import React, { useState } from "react";
import { ScreenMode } from "./SigninPage";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";

interface SignUpProps {
  onSwitchMode: (e: any) => void;
}

const SignupForm: React.FC<SignUpProps> = ({ onSwitchMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100%",
        color: colors.grey[800],
      }}
    >
      <Stack
        spacing={5}
        sx={{
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <Stack>
          <Typography variant="h4" fontWeight={600} color={colors.grey[800]}>
            Create an account
          </Typography>
          <Typography color={colors.grey[600]}>
            Join the Aviquo Family... TODAY!
          </Typography>
        </Stack>

        <Stack spacing={4}>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Typography color={colors.grey[800]}>Email</Typography>
              <TextField
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography color={colors.grey[800]}>Password</Typography>
              <TextField
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Stack>
          </Stack>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: `${colors.grey[400]} !important`,
              "&:hover": {
                bgcolor: `${colors.grey[600]} !important`,
              },
            }}
            onClick={() => {
              const submit = document.getElementById("form-submit");
              submit?.click();
            }}
          >
            Continue
          </Button>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Typography>Already have an account?</Typography>
          <Typography
            onClick={() => onSwitchMode(ScreenMode.SIGN_IN)}
            fontWeight={600}
            sx={{
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            Sign In
          </Typography>
        </Stack>
      </Stack>
      <AuthForm action="/api/signup">
        <input id="email" name="email" type="text" value={email} />
        <input id="password" name="password" type="password" value={password} />
        <button id="form-submit" type="submit"></button>
      </AuthForm>
    </Stack>
  );
};

export default SignupForm;
