import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
	
	const formData = await request.formData();
	const username = formData.get("username");
	const password = formData.get("password");
	const firstName = formData.get("first_name") as string;
	const lastName = formData.get("last_name") as string;
	const email = formData.get("email") as string;
	// basic check
	if (
		typeof username !== "string" ||
		username.length < 4 ||
		username.length > 31
	) {
		return NextResponse.json(
			{
				error: "Invalid username"
			},
			{
				status: 400
			}
		);
	}
	if (
		typeof password !== "string" ||
		password.length < 6 ||
		password.length > 255
	) {
		console.log('here2')
		return NextResponse.json(
			{
				error: "Invalid password"
			},
			{
				status: 400
			}
		);
	}
	try {
		console.log('here3')
		const user = await auth.createUser({
			key: {
				providerId: "username", // auth method
				providerUserId: username.toLowerCase(), // unique id when using "username" auth method
				password // hashed by Lucia
			},
			attributes: {
				username,
				firstName,
				lastName,
				email,
				pfp: '',
				bio: 'Hi! I\'m new to Aviquo!',
				numFollowers: 0,
				numFollowing: 0,
			}
		});
		console.log('here5')
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {}
		});
		const authRequest = auth.handleRequest(request.method, context);
		authRequest.setSession(session);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/" // redirect to profile page
			}
		});
	} catch (e) {
		console.log(e)
		// this part depends on the database you're using
		// check for unique constraint error in user table

		return NextResponse.json(
			{
				error: "An unknown error occurred"
			},
			{
				status: 500
			}
		);
	}
};