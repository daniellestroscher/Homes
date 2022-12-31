import NextAuth from 'next-auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import { ObjectEncodingOptions } from 'fs'
import { Options } from 'next-connect'

const options = {
  site: process.env.NEXTAUTH_URL
}

export default (req : NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options as any)

// import SequelizeAdapter from "@next-auth/sequelize-adapter"
// import { Sequelize } from "sequelize"

// // import { JWT } from 'next-auth/jwt/types'
// // import { Session } from 'next-auth/core/types'
// const sequelize = new Sequelize("yourconnectionstring")

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID as string,
//       clientSecret: process.env.GOOGLE_SECRET as string
//     }),
//     // Passwordless / email sign in
//     EmailProvider({
//       server: process.env.MAIL_SERVER,
//       from: 'NextAuth.js <no-reply@example.com>'
//     }),
//   ],
//   adapter: SequelizeAdapter(sequelize),
//   // callbacks: {
//   //   async jwt({ token, account }): Promise<JWT> {
//   //     if (account) {
//   //       token.accessToken = account.access_token
//   //     }
//   //     console.log({
//   //       msg: 'JWT callback result',
//   //       token: token,
//   //       account: account,
//   //     })
//   //     return token
//   //   },
//   //   async session({ session, token, user }): Promise<Session> {
//   //     // Send properties to the client, like an access_token from a provider.
//   //     session.accessToken = token.accessToken;
//   //     console.log({
//   //       msg: 'Session callback result',
//   //       session: session,
//   //       user: user,
//   //       token: token
//   //     })
//   //     return session
//   //   },
//   //}
//   pages: {
//     signIn: '/',
//     signOut: '/login',
//   }
// }

// export default NextAuth(authOptions)