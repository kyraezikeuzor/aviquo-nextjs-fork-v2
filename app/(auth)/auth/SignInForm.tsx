"use client"

import { Button, Stack, TextField, Typography, colors } from '@mui/material';
import React, { useState } from 'react';
import { ScreenMode } from './SigninPage';
import AuthForm from '@/components/AuthForm';

interface SignUpProps {
    onSwitchMode: (e: any) => void;
  }

const SigninForm: React.FC<SignUpProps> = ({ onSwitchMode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100%",
        color: colors.grey[800]
      }}
    >
      <Stack spacing={5} sx={{
        width: "100%",
        maxWidth: "500px"
      }}>
        <Stack>
          <Typography variant='h4' fontWeight={600} color={colors.grey[800]}>
            Welcome back
          </Typography>
          <Typography color={colors.grey[600]}>
            We cannot wait to have you join us again!
          </Typography>
        </Stack>

        <Stack spacing={4}>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Typography color={colors.grey[800]}>Username</Typography>
              <TextField value={username} onChange={(e) => {setUsername(e.target.value)}} />
            </Stack>
            <Stack spacing={1}>
              <Typography color={colors.grey[800]}>Password</Typography>
              <TextField type='password' value={password} onChange={(e) => {setPassword(e.target.value)}} />
            </Stack>
          </Stack>
          <Button
            variant='contained'
            size='large'
            sx={{
              bgcolor: `${colors.grey[400]} !important`,
              "&:hover": {
                bgcolor: `${colors.grey[600]} !important`
              }
            }}
            onClick={() => {
              const submit = document.getElementById('form-submit');
              submit?.click();
            }}
          >
            Sign in
          </Button>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Typography>Don&apos;t have an account?</Typography>
          <Typography
            onClick={() => onSwitchMode(ScreenMode.SIGN_UP)}
            fontWeight={600}
            sx={{
              cursor: "pointer",
              userSelect: "none"
            }}
          >
            Sign up now
          </Typography>
        </Stack>
      </Stack>
      <AuthForm action="/api/login">
          <input
            id="username"
            name="username"
            type="text"
            value={username}
          />
          <input
            id="password"
            name="password"
            type="password"
            value={password}
          />
          <button id="form-submit" type="submit"></button>
      </AuthForm>
    </Stack>
  );
};

export default SigninForm;