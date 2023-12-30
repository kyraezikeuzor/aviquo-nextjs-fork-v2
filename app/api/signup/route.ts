import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  // basic check
  if (
    typeof email !== "string" ||
    email.length < 4 ||
    email.length > 31
  ) {
    console.log('a)')
    return NextResponse.json(
      {
        error: "Invalid username",
      },
      {
        status: 400,
      },
    );
  }
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    console.log('b)')
    return NextResponse.json(
      {
        error: "Invalid password",
      },
      {
        status: 400,
      },
    );
  }
  try {
    const user = await auth.createUser({
      key: {
        providerId: "email", // auth method
        providerUserId: email.toLowerCase(), // unique id when using "username" auth method
        password, // hashed by Lucia
      },
      attributes: {
        username: "",
        firstName: "",
        lastName: "",
        email,
        pfp: "",
        bio: "Hi! I'm new to Aviquo!",
        numFollowers: 0,
        numFollowing: 0,
      },
    });
    
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest(request.method, context);
    authRequest.setSession(session);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/", // redirect to profile page
      },
    });
  } catch (e) {
    console.log(e);
    // this part depends on the database you're using
    // check for unique constraint error in user table

    return NextResponse.json(
      {
        error: "An unknown error occurred",
      },
      {
        status: 500,
      },
    );
  }
};
