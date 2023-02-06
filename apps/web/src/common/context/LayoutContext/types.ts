export interface ILayoutContext {
  navbarFocus: NavbarFocus
  setNavbarFocus: (focus: NavbarFocus) => void
  isHideNavbar: boolean
  setHideNavbar: (isHideNavbar: boolean) => void
  onSearch: (() => void) | null
  setOnSearch: (callback: (() => void) | null) => void
}

export type NavbarFocus =
  | 'jobs'
  | 'profile'
  | 'notification'
  | 'createJob'
  | null
