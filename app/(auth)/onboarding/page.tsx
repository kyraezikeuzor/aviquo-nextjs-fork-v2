import { auth, getPageSession } from "@/auth/lucia";
import { CssBaseline } from "@mui/material";
import * as context from "next/headers";
import { redirect } from "next/navigation";
import Onboarding from "./onboarding";



export default async function OnboardingPage() {
    const session = await getPageSession();
    if (!session) redirect("/auth");
    if (session.user.username != "" || session.user.firstName != "" || session.user.lastName != "") redirect("/profile");

    return (
        <>
            <Onboarding user={session.user} />
        </>
    )
}