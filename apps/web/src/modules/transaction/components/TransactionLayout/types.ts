import { PropsWithChildren } from 'react'

import { MENU_ITEM } from './constants'

export type TransactionLayoutProps = PropsWithChildren<{
  focus: (typeof MENU_ITEM)[number]['label']
}>
