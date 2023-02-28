import { UserType } from '@modela/dtos'
import { ChipProps } from 'common/components/Chip/types'

export const CHIP_VARIANTS: { [key in UserType]?: ChipProps } = {
  [UserType.CASTING]: {
    label: 'ผู้กำกับ',
    variant: 'green',
  },
  [UserType.ACTOR]: {
    label: 'นักแสดง',
    variant: 'red',
  },
}
