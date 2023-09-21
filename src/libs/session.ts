import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";
import jsonwebtoken from "jsonwebtoken";
import { JWT, encode } from "next-auth/jwt";
import { UserProfile } from "@/common.types";
import { getUser } from "./graphql/query";
import { createUser } from "./graphql/mutations";


export const authOptions: NextAuthOptions = {
    providers: [
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID!,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        // }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        })
    ],
    session: { maxAge: 60 * 60 * 3 },

    theme: {
        colorScheme: "light",
        logo: "/logo.svg",
    },
    jwt: {
        encode: async ({ secret, token }) => {
            const encodedToken = await jsonwebtoken.sign(
                {
                    ...token,
                    iss: "grafbase",
                    exp: Math.floor(Date.now() / 1000) + 60 * 60,
                },
                secret
            );

            return encodedToken;
        },
        decode: async ({ secret, token }) => {
            const decodedToken = await jsonwebtoken.verify(token!, secret);
            return decodedToken as JWT;
        },
    },
    callbacks: {
        async session({ session }) {

            const email = session?.user?.email as string;

            try {
                const data = await getUser(email) as { user?: UserProfile }

                const newSession = {
                    ...session,
                    user: {
                        ...session.user,
                        ...data?.user,
                    },
                };

                return newSession;
            } catch (error: any) {
                console.error("Error retrieving user data: ", error.message);
                return session;
            }
        },
        async signIn({ user }: {
            user: AdapterUser | User
        }) {
            try {

                const userExists = await getUser(user?.email as string) as { user?: UserProfile }

                if (!userExists.user) {
                    await createUser({
                        name: user.name as string,
                        email: user.email as string,
                        avatarUrl: user.image as string
                    })
                }

                return true;
            } catch (error: any) {
                console.error("Error checking if user exists: ", error.message);
                return false;
            }
        },
    },
};

