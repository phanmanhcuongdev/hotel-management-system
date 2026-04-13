import axios from 'axios'
import { notifyError } from '../features/notifications/notificationStore'

const SESSION_KEY = 'hotel.auth.session'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim() || '/api'

interface ApiErrorPayload {
  error?: string
  message?: string
  details?: Array<{ field: string; message: string }>
}

interface ApiRequestConfigMeta {
  skipGlobalErrorLog?: boolean
  skipGlobalErrorNotify?: boolean
}

declare module 'axios' {
  interface AxiosRequestConfig {
    metadata?: ApiRequestConfigMeta
  }

  interface InternalAxiosRequestConfig {
    metadata?: ApiRequestConfigMeta
  }
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
  if (!status) {
    return 'Cannot reach the API server. Make sure the backend is running and the API URL is configured correctly.'
  }

  if (status === 400) {
    if (payload?.details?.length) {
      return payload.details.map((detail) => detail.message).join('\n')
    }

    return payload?.message ?? 'The submitted data is invalid.'
  }

  if (status === 403) {
    return payload?.message ?? 'You do not have permission to perform this action.'
  }

  if (status === 404) {
    return payload?.message ?? 'The requested record was not found.'
  }

  if (status === 409) {
    return payload?.message ?? 'The request conflicts with the current record state.'
  }

  if (status === 401) {
    return payload?.message ?? 'Your session is invalid or has expired.'
  }

  return payload?.message ?? 'An unexpected API error occurred.'
}

function toApiClientError(error: unknown) {
  if (!axios.isAxiosError<ApiErrorPayload>(error)) {
    return error instanceof Error ? error : new Error('An unknown error occurred.')
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
  baseURL: API_BASE_URL,
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
    if (!error.config?.metadata?.skipGlobalErrorLog) {
      console.error('API Error:', error.response?.data || error.message)
    }

    if (!error.config?.metadata?.skipGlobalErrorNotify) {
      const status = normalizedError instanceof ApiClientError ? normalizedError.status : undefined
      if (!status || status >= 500) {
        notifyError('Request failed', normalizedError.message)
      }
    }

    return Promise.reject(normalizedError)
  }
)
