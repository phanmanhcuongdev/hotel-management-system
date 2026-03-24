export interface AuthUser {
  id: string
  name: string
  email: string
  role: string
  initials: string
}

export interface AuthSession {
  token: string
  user: AuthUser
  mode: 'mock' | 'api'
}

export interface LoginCredentials {
  username: string
  password: string
  remember: boolean
}
