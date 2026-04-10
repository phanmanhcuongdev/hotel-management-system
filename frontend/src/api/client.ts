import axios from 'axios'

const SESSION_KEY = 'hotel.auth.session'

interface ApiErrorPayload {
  error?: string
  message?: string
  details?: Array<{ field: string; message: string }>
}

export class ApiClientError extends Error {
  status?: number
  code?: string
  details?: Array<{ field: string; message: string }>

  constructor(message: string, options?: { status?: number; code?: string; details?: Array<{ field: string; message: string }> }) {
    super(message)
    this.name = 'ApiClientError'
    this.status = options?.status
    this.code = options?.code
    this.details = options?.details
  }
}

function buildErrorMessage(status?: number, payload?: ApiErrorPayload) {
  if (status === 400) {
    if (payload?.details?.length) {
      return payload.details.map((detail) => detail.message).join('\n')
    }

    return payload?.message ?? 'Du lieu gui len khong hop le.'
  }

  if (status === 403) {
    return payload?.message ?? 'Ban khong co quyen thuc hien thao tac nay.'
  }

  if (status === 404) {
    return payload?.message ?? 'Khong tim thay du lieu yeu cau.'
  }

  if (status === 409) {
    return payload?.message ?? 'Du lieu xung dot voi trang thai hien tai.'
  }

  if (status === 401) {
    return payload?.message ?? 'Phien dang nhap da het han hoac khong hop le.'
  }

  return payload?.message ?? 'Da xay ra loi khi ket noi API.'
}

function toApiClientError(error: unknown) {
  if (!axios.isAxiosError<ApiErrorPayload>(error)) {
    return error instanceof Error ? error : new Error('Da xay ra loi khong xac dinh.')
  }

  const status = error.response?.status
  const payload = error.response?.data

  return new ApiClientError(buildErrorMessage(status, payload), {
    status,
    code: payload?.error,
    details: payload?.details,
  })
}

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

    const normalizedError = toApiClientError(error)
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(normalizedError)
  }
)
