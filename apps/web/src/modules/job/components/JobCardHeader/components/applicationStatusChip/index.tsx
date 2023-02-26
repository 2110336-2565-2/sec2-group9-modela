import { ApplicationStatus } from '@modela/dtos'
import { Chip } from '@mui/material'

import { ApplicationStatusChipProps } from './types'

export default function ApplicationStatusChip(
  props: ApplicationStatusChipProps,
) {
  const { applicationStatus } = props
  return (
    <Chip
      label={
        applicationStatus === ApplicationStatus.PENDING
          ? 'รอคัดเลือก'
          : applicationStatus === ApplicationStatus.OFFER_SENT
          ? 'ผ่านการคัดเลือก'
          : applicationStatus === ApplicationStatus.REJECTED
          ? 'ไม่ผ่านการคัดเลือก'
          : applicationStatus === ApplicationStatus.OFFER_ACCEPTED
          ? 'ยอมรับข้อเสนอ'
          : 'ปฎิเสธข้อเสนอ'
      }
      sx={{
        color:
          applicationStatus === ApplicationStatus.PENDING
            ? '#D28A1D'
            : applicationStatus === ApplicationStatus.OFFER_SENT
            ? '#66A373'
            : applicationStatus === ApplicationStatus.REJECTED
            ? '#AA5B5B'
            : applicationStatus === ApplicationStatus.OFFER_ACCEPTED
            ? '#66A373'
            : '#AA5B5B',
        background:
          applicationStatus === ApplicationStatus.PENDING
            ? 'rgba(210, 138, 29, 0.2)'
            : applicationStatus === ApplicationStatus.OFFER_SENT
            ? '#E0ECE3'
            : applicationStatus === ApplicationStatus.REJECTED
            ? '#EEDEDE'
            : applicationStatus === ApplicationStatus.OFFER_ACCEPTED
            ? '#E0ECE3'
            : '#EEDEDE',
        border:
          applicationStatus === ApplicationStatus.OFFER_REJECTED
            ? '1px solid currentColor'
            : applicationStatus === ApplicationStatus.OFFER_ACCEPTED
            ? '1px solid currentColor'
            : '',
      }}
    />
  )
}
