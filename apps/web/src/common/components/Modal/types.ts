import { ModalProps as MUIModalProps } from '@mui/material'
import { SxPropsWithTheme } from 'common/types/mui'

export interface ModalProps extends MUIModalProps {
  rootClassName?: string
  rootSx?: SxPropsWithTheme
  contentClassName?: string
  contentSx?: SxPropsWithTheme
}
