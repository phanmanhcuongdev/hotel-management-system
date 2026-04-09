import { beforeEach, describe, expect, it } from 'vitest'
import { bootstrapSession, loginUser, logoutUser } from './authService'

describe('authService', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.sessionStorage.clear()
  })

  it('creates a mock session for valid demo credentials', async () => {
    const session = await loginUser({
      username: 'admin',
      password: 'admin123',
      remember: true,
    })

    expect(session.mode).toBe('mock')
    expect(session.user.role).toBe('Administrator')
    expect(bootstrapSession()?.token).toBe('mock-hotel-admin-token')
  })

  it('stores non-remembered sessions in sessionStorage only', async () => {
    await loginUser({
      username: 'admin@hotel.com',
      password: 'admin123',
      remember: false,
    })

    expect(window.sessionStorage.getItem('hotel.auth.session')).toContain('mock-hotel-admin-token')
    expect(window.localStorage.getItem('hotel.auth.session')).toBeNull()
  })

  it('rejects invalid demo credentials', async () => {
    await expect(
      loginUser({
        username: 'wrong-user',
        password: 'bad-pass',
        remember: true,
      })
    ).rejects.toThrow('Sai tài khoản demo')
  })

  it('clears session on logout', async () => {
    await loginUser({
      username: 'admin',
      password: 'admin123',
      remember: true,
    })

    logoutUser()

    expect(bootstrapSession()).toBeNull()
    expect(window.localStorage.getItem('hotel.auth.session')).toBeNull()
    expect(window.sessionStorage.getItem('hotel.auth.session')).toBeNull()
  })
})
