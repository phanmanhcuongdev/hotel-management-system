import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { bootstrapSession, discardSession, loginUser, logoutUser } from './authService'
import { AuthContext, type AuthContextValue } from './AuthContext'
import type { AuthSession } from './types'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading')
  const [session, setSession] = useState<AuthSession | null>(null)

  useEffect(() => {
    let active = true

    const initializeSession = async () => {
      const storedSession = await bootstrapSession()

      if (!active) {
        return
      }

      if (storedSession) {
        setSession(storedSession)
        setStatus('authenticated')
        return
      }

      setStatus('unauthenticated')
    }

    void initializeSession()

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    const handleUnauthorized = () => {
      discardSession()
      setSession(null)
      setStatus('unauthenticated')
    }

    window.addEventListener('auth:unauthorized', handleUnauthorized)

    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized)
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      user: session?.user ?? null,
      session,
      async login(credentials) {
        const nextSession = await loginUser(credentials)
        setSession(nextSession)
        setStatus('authenticated')
        return nextSession
      },
      async logout() {
        await logoutUser(session)
        setSession(null)
        setStatus('unauthenticated')
      },
    }),
    [session, status],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
