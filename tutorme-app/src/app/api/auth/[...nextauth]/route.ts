/**
 * NextAuth.js API Route
 * Handles all authentication requests
 * 
 * This file creates these endpoints:
 * - POST /api/auth/signin - Login
 * - POST /api/auth/signout - Logout
 * - GET/POST /api/auth/session - Get session
 * - GET/POST /api/auth/csrf - CSRF token
 * 
 * Documentation: https://next-auth.js.org/
 */

import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
