import { SxPropsWithTheme } from 'common/types/mui'
import { ReactNode } from 'react'

export interface MenuBarProps {
  menu: {
    icon: ReactNode
    label: string
    href: string
  }[]
  focus?: string
  sx?: SxPropsWithTheme
}
