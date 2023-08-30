import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "../server/lib/prisma";
import { compare } from "bcryptjs";

import type { NextApiRequest, NextApiResponse } from "next";
import GoogleProvider from "next-auth/providers/google";

// import SequelizeAdapter from "@auth/sequelize-adapter";
// import { sequelize } from "../../server/database/connection";
import NextAuth from "next-auth";

//const adapter = SequelizeAdapter(sequelize);
//not recommended in production...
// sequelize.sync();

export const authOptions: NextAuthOptions = {
  //debug: true,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null; //tell auth js that the credentials were incorrect
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password as string
        );

        if (!isPasswordValid) {
          console.log("invalid password...");
          return null;
        }

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          image: user.image,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  // adapter: adapter as any,
  secret: process.env.NEXTAUTH_SECRET,
  // callbacks: {
  //   session: ({ session, token }) => {
  //     console.log("Session Callback", { session, token });
  //     return {
  //       ...session,
  //       user: {
  //         ...session.user,
  //         id: token.id,
  //         randomKey: token.randomKey,
  //       },
  //     };
  //   },
  //   jwt: ({ token, user }) => {
  //     console.log("JWT Callback", { token, user });
  //     if (user) {
  //       const u = user as unknown as any;
  //       return {
  //         ...token,
  //         id: u.id,
  //         randomKey: u.randomKey,
  //       };
  //     }
  //     return token;
  //   },
  // },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, authOptions);
