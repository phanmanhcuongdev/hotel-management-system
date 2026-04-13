import { useSyncExternalStore } from 'react'

export type NotificationTone = 'success' | 'error' | 'info' | 'warning'

export interface NotificationInput {
  title: string
  message?: string
  tone?: NotificationTone
  durationMs?: number
}

export interface AppNotification {
  id: string
  title: string
  message?: string
  tone: NotificationTone
  createdAt: number
  read: boolean
  toastVisible: boolean
}

interface NotificationState {
  items: AppNotification[]
}

const DEFAULT_TONE: NotificationTone = 'info'
const DEFAULT_DURATION_MS = 5000
const MAX_ITEMS = 40

let sequence = 0
let state: NotificationState = { items: [] }
const listeners = new Set<() => void>()
const toastTimers = new Map<string, number>()

function getNextId() {
  sequence += 1
  return `notify-${Date.now()}-${sequence}`
}

function emitChange() {
  listeners.forEach((listener) => listener())
}

function setState(updater: (previous: NotificationState) => NotificationState) {
  state = updater(state)
  emitChange()
}

function clearToastTimer(id: string) {
  const existingTimer = toastTimers.get(id)
  if (existingTimer !== undefined) {
    window.clearTimeout(existingTimer)
    toastTimers.delete(id)
  }
}

export function subscribeNotifications(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function getNotificationState() {
  return state
}

export function useNotificationsState() {
  return useSyncExternalStore(subscribeNotifications, getNotificationState, getNotificationState)
}

export function pushNotification(input: NotificationInput) {
  const id = getNextId()
  const notification: AppNotification = {
    id,
    title: input.title,
    message: input.message,
    tone: input.tone ?? DEFAULT_TONE,
    createdAt: Date.now(),
    read: false,
    toastVisible: true,
  }

  setState((previous) => ({
    items: [notification, ...previous.items].slice(0, MAX_ITEMS),
  }))

  const timeoutMs = input.durationMs ?? DEFAULT_DURATION_MS
  if (timeoutMs > 0) {
    const timeoutHandle = window.setTimeout(() => {
      hideNotificationToast(id)
    }, timeoutMs)
    toastTimers.set(id, timeoutHandle)
  }

  return id
}

export function hideNotificationToast(id: string) {
  clearToastTimer(id)
  setState((previous) => ({
    items: previous.items.map((item) =>
      item.id === id
        ? {
            ...item,
            toastVisible: false,
          }
        : item,
    ),
  }))
}

export function markNotificationRead(id: string) {
  setState((previous) => ({
    items: previous.items.map((item) =>
      item.id === id
        ? {
            ...item,
            read: true,
          }
        : item,
    ),
  }))
}

export function markAllNotificationsRead() {
  setState((previous) => ({
    items: previous.items.map((item) =>
      item.read
        ? item
        : {
            ...item,
            read: true,
          },
    ),
  }))
}

export function notifySuccess(title: string, message?: string, durationMs?: number) {
  return pushNotification({ title, message, tone: 'success', durationMs })
}

export function notifyError(title: string, message?: string, durationMs?: number) {
  return pushNotification({ title, message, tone: 'error', durationMs })
}

export function notifyInfo(title: string, message?: string, durationMs?: number) {
  return pushNotification({ title, message, tone: 'info', durationMs })
}

export function notifyWarning(title: string, message?: string, durationMs?: number) {
  return pushNotification({ title, message, tone: 'warning', durationMs })
}
