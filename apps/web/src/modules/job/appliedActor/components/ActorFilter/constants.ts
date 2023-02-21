import { ApplicationStatus } from '@modela/database'

export const FILTER_FIELDS = [
  {
    status: ApplicationStatus.PENDING,
    label: 'รอคัดเลือก',
  },
  {
    status: ApplicationStatus.OFFER_SENT,
    label: 'ผ่านการคัดเลือก',
  },

  {
    status: ApplicationStatus.REJECTED,
    label: 'ไม่ผ่านการคัดเลือก',
  },

  {
    status: ApplicationStatus.OFFER_ACCEPTED,
    label: 'ยอมรับข้อเสนอ',
  },
  {
    status: ApplicationStatus.OFFER_REJECTED,
    label: 'ปฏิเสธข้อเสนอ',
  },
]
