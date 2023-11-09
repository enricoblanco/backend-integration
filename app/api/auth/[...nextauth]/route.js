import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

import { User } from '@/backend/models/User'
import connect from '@/backend/db/connection'

export const authOptions = {

  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith@gmail.com' },
        password: { label: 'Password', type: 'password' }
      },

      async authorize (credentials) {
        await connect()
        try {
          const user = await User.findOne({ email: credentials.email })

          if (user) {
            const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

            if (isPasswordValid) {
              return user
            }
          }
        } catch (error) {
          throw new Error('Error connecting to database')
        }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })

  ]
}

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
