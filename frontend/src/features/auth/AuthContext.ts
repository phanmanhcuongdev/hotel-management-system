import { createContext } from 'react'
import type { AuthSession, AuthUser, LoginCredentials } from './types'

export interface AuthContextValue {
  status: 'loading' | 'authenticated' | 'unauthenticated'
  user: AuthUser | null
  session: AuthSession | null
  login: (credentials: LoginCredentials) => Promise<AuthSession>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
