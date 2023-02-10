export interface INotiContext {
  displayNotification: (
    message: string,
    type: NotiType,
    duration?: number,
  ) => void
}

export type NotiType = 'success' | 'error' | 'warning' | 'info'
