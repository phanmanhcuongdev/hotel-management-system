import { login as loginWithApi } from '../../api/authApi'
import { clearStoredSession, loadStoredSession, persistSession } from './authStorage'
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
      role: 'Administrator',
      initials: createInitials('Alex Nguyen'),
    },
  }
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

async function loginWithMock(credentials: LoginCredentials) {
  await sleep(MOCK_AUTH_DELAY_MS)

  const normalizedUsername = credentials.username.trim().toLowerCase()

  if (
    !['admin', 'admin@hotel.com'].includes(normalizedUsername) ||
    credentials.password !== 'admin123'
  ) {
    throw new Error('Sai tai khoan demo. Thu lai voi admin / admin123.')
  }

  return buildMockSession(normalizedUsername)
}

export async function loginUser(credentials: LoginCredentials) {
  const session = MOCK_AUTH_ENABLED
    ? await loginWithMock(credentials)
    : normalizeApiSession(await loginWithApi(credentials.username, credentials.password), credentials.username)

  persistSession(session, credentials.remember)
  return session
}

export function bootstrapSession() {
  return loadStoredSession()
}

export function logoutUser() {
  clearStoredSession()
}
