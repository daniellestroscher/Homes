import NextAuth, { NextAuthOptions } from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import Auth0Provider from "next-auth/providers/auth0";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";

import SequelizeAdapter from "@next-auth/sequelize-adapter";
import { sequelize } from "../../../database/connection";
//import { Sequelize } from "sequelize"
//const connectionString = process.env.DB_CONNECTION_STRING as string;
//const sequelize = new Sequelize(connectionString)

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_ID as string,
      clientSecret: process.env.AUTH0_SECRET as string,
      issuer: process.env.AUTH0_ISSUER,
    }),
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD
    //     }
    //   },
    //   from: process.env.EMAIL_FROM,
    //   maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  adapter: SequelizeAdapter(sequelize),
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token }: any) {
      token.userRole = "admin";
      return token;
    },
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, authOptions);
