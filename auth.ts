/*import { z } from 'zod';

import prisma from './lib/prisma';
import NextAuth from "next-auth"
import type NextAuthConfig from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
 
async function getUser(username: string) {
  try {
    const user = await prisma.user.findUnique({
        where: {
          username: username,
        },
      })
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}


export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  trustHost: true,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          const user = await getUser(username);
         
          if (!user) return null;

          const passwordsMatch = password == user.password;
          // console.log('huhh')
          // console.log(user);
 
          if (passwordsMatch) return user;
        }
 
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
  callbacks: {
    // async session({ session, user }) {
    //   // Send properties to the client, like an access_token from a provider.
    // }
    // async signIn(user) {
    //   // Custom logic on successful sign-in
    //   // Redirect to a specific page
    //   if (user) {
    //     window.location.href = '/dashboard'; // Replace '/dashboard' with your desired page
    //     return true;
    //   }

    //   // Return false to prevent the default behavior
    //   return false;
    // },
  },
  session: {
    maxAge: 30 * 60, // 30 days (adjust as needed)
  },
} satisfies typeof NextAuthConfig



export const { handlers, auth, signIn, signOut } = NextAuth(config)
*/