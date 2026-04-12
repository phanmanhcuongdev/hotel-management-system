import type { AuthSession } from './types'

const SESSION_KEY = 'hotel.auth.session'

function safeParseSession(value: string | null) {
  if (!value) {
    return null
  }

  try {
    return JSON.parse(value) as AuthSession
  } catch {
    return null
  }
}

export function loadStoredSession() {
  return safeParseSession(window.sessionStorage.getItem(SESSION_KEY)) ?? safeParseSession(window.localStorage.getItem(SESSION_KEY))
}

export function persistSession(session: AuthSession, remember: boolean) {
  const targetStorage = remember ? window.localStorage : window.sessionStorage
  const staleStorage = remember ? window.sessionStorage : window.localStorage

  staleStorage.removeItem(SESSION_KEY)
  targetStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function replaceStoredSession(session: AuthSession) {
  const hasLocalSession = !!safeParseSession(window.localStorage.getItem(SESSION_KEY))
  const hasSessionSession = !!safeParseSession(window.sessionStorage.getItem(SESSION_KEY))

  if (hasLocalSession) {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    return
  }

  if (hasSessionSession) {
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
    return
  }

  window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearStoredSession() {
  window.localStorage.removeItem(SESSION_KEY)
  window.sessionStorage.removeItem(SESSION_KEY)
}
