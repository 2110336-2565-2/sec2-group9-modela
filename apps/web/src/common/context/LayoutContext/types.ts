export interface ILayoutContext {
  navbarFocus: NavbarFocus
  setNavbarFocus: (focus: NavbarFocus) => void
  isHideNavbar: boolean
  setHideNavbar: (isHideNavbar: boolean) => void
  onSearch: (() => void) | null
  setOnSearch: (callback: (() => void) | null) => void
  override: NavbarOverride | null
  setOverride: (override: NavbarOverride | null) => void
}

export interface NavbarOverride {
  title: string
  onBack: () => void
}

export type NavbarFocus =
  | 'jobs'
  | 'profile'
  | 'notification'
  | 'createJob'
  | null
