export interface INotificationContext {
  displayNotification: (
    message: string,
    type: NotificationType,
    duration?: number,
  ) => void
}

export type NotificationType = 'success' | 'error' | 'warning' | 'info'
