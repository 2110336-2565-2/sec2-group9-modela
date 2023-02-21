import { SxProps } from '@mui/material'
import { ReactNode } from 'react'

export interface MenuBarProps {
  menu: {
    icon: ReactNode
    label: string
    href: string
  }[]
  focus?: string
  sx?: SxProps
}
