export interface ISnackbarContext {
  displaySnackbar: (
    message: string,
    type: SnackbarType,
    duration?: number,
  ) => void
}

export type SnackbarType = 'success' | 'error' | 'warning' | 'info'
