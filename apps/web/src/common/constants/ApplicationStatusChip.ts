import { ApplicationStatus } from '@modela/dtos'
import { ChipProps } from 'common/components/Chip/types'

export const CHIP_VARIANTS: { [key in ApplicationStatus]: ChipProps } = {
  [ApplicationStatus.PENDING]: {
    label: 'รอคัดเลือก',
    variant: 'orange',
  },
  [ApplicationStatus.OFFER_SENT]: {
    label: 'ผ่านการคัดเลือก',
    variant: 'green',
  },
  [ApplicationStatus.REJECTED]: {
    label: 'ไม่ผ่านการคัดเลือก',
    variant: 'red',
  },
  [ApplicationStatus.OFFER_ACCEPTED]: {
    label: 'ยอมรับข้อเสนอ',
    variant: 'green',
    outlined: true,
  },
  [ApplicationStatus.OFFER_REJECTED]: {
    label: 'ปฏิเสธข้อเสนอ',
    variant: 'red',
    outlined: true,
  },
}
