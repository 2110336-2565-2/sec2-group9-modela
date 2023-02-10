export interface INotiContext {
  handleClose: () => void
  displayNoti: (message: string, type: NotiType, duration?: number) => void
}

export type NotiType = 'success' | 'error' | 'warning' | 'info'
