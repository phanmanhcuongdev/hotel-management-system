import { login as loginWithApi } from '../../api/authApi'
import { clearStoredSession, loadStoredSession, persistSession } from './authStorage'
import type { AuthSession, LoginCredentials } from './types'

export const MOCK_AUTH_ENABLED = false

function createInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function normalizeApiSession(data: Awaited<ReturnType<typeof loginWithApi>>, username: string): AuthSession {
  const token = data.token ?? data.accessToken

  if (!token) {
    throw new Error('Auth API khong tra ve token hop le.')
  }

  const name = data.user?.fullName ?? data.user?.name ?? username
  const email = data.user?.email ?? (username.includes('@') ? username : `${username}@hotel.local`)
  const role = data.user?.role ?? 'Authenticated User'

  return {
    token,
    mode: 'api',
    user: {
      id: String(data.user?.id ?? username),
      name,
      email,
      role,
      initials: createInitials(name),
    },
  }
}

export async function loginUser(credentials: LoginCredentials) {
  const session = normalizeApiSession(await loginWithApi(credentials.username, credentials.password), credentials.username)

  persistSession(session, credentials.remember)
  return session
}

export function bootstrapSession() {
  return loadStoredSession()
}

export function logoutUser() {
  clearStoredSession()
}
