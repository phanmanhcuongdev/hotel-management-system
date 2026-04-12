import { getCurrentUser, login as loginWithApi, logout as logoutWithApi } from '../../api/authApi'
import type { LoginApiResponse, MeApiResponse } from '../../api/authApi'
import { clearStoredSession, loadStoredSession, persistSession, replaceStoredSession } from './authStorage'
import type { AuthSession, LoginCredentials } from './types'

const MOCK_AUTH_DELAY_MS = 700
export const MOCK_AUTH_ENABLED =
  import.meta.env.VITE_ENABLE_MOCK_AUTH === 'true' ||
  (import.meta.env.DEV && import.meta.env.VITE_ENABLE_MOCK_AUTH !== 'false' && import.meta.env.VITE_ENABLE_REAL_AUTH !== 'true')

function sleep(delay: number) {
  return new Promise((resolve) => window.setTimeout(resolve, delay))
}

function createInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function buildMockSession(username: string): AuthSession {
  return {
    token: 'mock-hotel-admin-token',
    mode: 'mock',
    user: {
      id: 'demo-admin',
      name: 'Alex Nguyen',
      email: username.includes('@') ? username : 'admin@hotel.com',
      role: 'ADMIN',
      initials: createInitials('Alex Nguyen'),
    },
  }
}

function normalizeApiUser(user: MeApiResponse): AuthSession['user'] {
  return {
    id: String(user.id),
    name: user.fullName,
    email: user.username.includes('@') ? user.username : `${user.username}@hotel.local`,
    role: user.position,
    initials: createInitials(user.fullName),
  }
}

function normalizeApiSession(data: LoginApiResponse): AuthSession {
  if (!data.token) {
    throw new Error('Auth API did not return a valid token.')
  }

  return {
    token: data.token,
    mode: 'api',
    user: normalizeApiUser(data.user),
  }
}

async function loginWithMock(credentials: LoginCredentials) {
  await sleep(MOCK_AUTH_DELAY_MS)

  const normalizedUsername = credentials.username.trim().toLowerCase()

  if (!['admin', 'admin@hotel.com'].includes(normalizedUsername) || credentials.password !== 'admin123') {
    throw new Error('Invalid demo credentials. Try admin / admin123.')
  }

  return buildMockSession(normalizedUsername)
}

export async function loginUser(credentials: LoginCredentials) {
  const session = MOCK_AUTH_ENABLED
    ? await loginWithMock(credentials)
    : normalizeApiSession(await loginWithApi(credentials.username, credentials.password))

  persistSession(session, credentials.remember)
  return session
}

export async function bootstrapSession() {
  const storedSession = loadStoredSession()

  if (!storedSession) {
    return null
  }

  if (storedSession.mode === 'mock') {
    return storedSession
  }

  try {
    const currentUser = await getCurrentUser()
    const refreshedSession: AuthSession = {
      ...storedSession,
      user: normalizeApiUser(currentUser),
    }

    replaceStoredSession(refreshedSession)
    return refreshedSession
  } catch {
    clearStoredSession()
    return null
  }
}

export async function logoutUser(session: AuthSession | null) {
  try {
    if (session?.mode === 'api') {
      await logoutWithApi()
    }
  } finally {
    clearStoredSession()
  }
}

export function discardSession() {
  clearStoredSession()
}
