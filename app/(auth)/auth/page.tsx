import SigninPage from "./SigninPage";

import { auth, getPageSession } from "@/auth/lucia";
import { CssBaseline } from "@mui/material";
import * as context from "next/headers";
import { redirect } from "next/navigation";

export default async function Login() {
    const session = await getPageSession();
  
    if (session) redirect("/profile");

    return(
        <>
        <CssBaseline />
        <SigninPage />
        </>
        
    )

}