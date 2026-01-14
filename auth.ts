// auth.ts
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { sql } from '@vercel/postgres'
import bcrypt from 'bcryptjs'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Check if user exists
          const result = await sql`
            SELECT * FROM users WHERE email = ${credentials.email as string}
          `
          
          const user = result.rows[0]

          if (!user || !user.password_hash) {
            return null
          }

          // Verify password
          const isValid = await bcrypt.compare(
            credentials.password as string,
            user.password_hash
          )

          if (!isValid) {
            return null
          }

          return {
            id: user.user_id.toString(),
            email: user.email,
            name: user.username,
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          // Check if user exists
          const existingUser = await sql`
            SELECT * FROM users WHERE email = ${user.email}
          `

          if (existingUser.rows.length === 0) {
            // Create new user for Google login
            await sql`
              INSERT INTO users (email, username, created_at, updated_at)
              VALUES (${user.email}, ${user.name || user.email}, NOW(), NOW())
            `
          }
          
          return true
        } catch (error) {
          console.error('Sign in error:', error)
          return false
        }
      }
      return true
    },
    async jwt({ token, user, account }) {
      if (user) {
        // Get user_id from database
        const result = await sql`
          SELECT user_id FROM users WHERE email = ${user.email}
        `
        token.userId = result.rows[0]?.user_id
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.userId as string
        session.user.email = token.email as string
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
})