import { Dispatch, SetStateAction } from 'react'

export interface ILayoutContext {
  navbarFocus: NavbarFocus
  setNavbarFocus: Dispatch<SetStateAction<NavbarFocus>>
  isHideNavbar: boolean
  setHideNavbar: Dispatch<SetStateAction<boolean>>
  onSearch: (() => void) | null
  setOnSearch: Dispatch<SetStateAction<(() => void) | null>>
  override: NavbarOverride | null
  setOverride: Dispatch<SetStateAction<NavbarOverride | null>>
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
