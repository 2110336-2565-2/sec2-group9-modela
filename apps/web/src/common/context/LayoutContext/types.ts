export interface ILayoutContext {
  navbarFocus: NavbarFocus
  setNavbarFocus: (focus: NavbarFocus) => void
  isHideNavbar: boolean
  setHideNavbar: (isHideNavbar: boolean) => void
}

export type NavbarFocus =
  | 'jobs'
  | 'profile'
  | 'notification'
  | 'createJob'
  | null
