export interface ILayoutContext {
  headerFocus: HeaderFocus
  setHeaderFocus: (focus: HeaderFocus) => void
  isHideHeader: boolean
  setHideHeader: (isHideHeader: boolean) => void
}

export type HeaderFocus = 'jobs' | 'profile' | 'notification' | null
