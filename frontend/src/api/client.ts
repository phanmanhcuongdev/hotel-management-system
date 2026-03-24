import axios from 'axios'

const SESSION_KEY = 'hotel.auth.session'

export const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const storedSession = window.localStorage.getItem(SESSION_KEY) ?? window.sessionStorage.getItem(SESSION_KEY)

  if (!storedSession) {
    return config
  }

  try {
    const parsedSession = JSON.parse(storedSession) as { token?: string }

    if (parsedSession.token) {
      config.headers.Authorization = `Bearer ${parsedSession.token}`
    }
  } catch {
    window.localStorage.removeItem(SESSION_KEY)
    window.sessionStorage.removeItem(SESSION_KEY)
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.dispatchEvent(new CustomEvent('auth:unauthorized'))
    }

    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)
