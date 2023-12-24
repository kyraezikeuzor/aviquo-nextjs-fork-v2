import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";

import AuthForm from "@/components/AuthForm";

const Page = async () => {
	const authRequest = auth.handleRequest("GET", context);
	const session = await authRequest.validate();
  console.log(session);
	if (!session) redirect("/login");
	return (
		<>
			<h1>Profile</h1>
			<p>User id: {session.user.userId}</p>
			<p>Username: {session.user.username}</p>
			<AuthForm action="/api/logout">
				<input type="submit" value="Sign out" />
			</AuthForm>
		</>
	);
};

export default Page;