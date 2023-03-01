import { ApplicationStatus } from '@modela/dtos'

export const APPLICATION_LABEL = {
  [ApplicationStatus.PENDING]: 'รอคัดเลือก',
  [ApplicationStatus.OFFER_SENT]: 'ผ่านการคัดเลือก',
  [ApplicationStatus.REJECTED]: 'ไม่ผ่านการคัดเลือก',
  [ApplicationStatus.OFFER_ACCEPTED]: 'ยอมรับข้อเสนอ',
  [ApplicationStatus.OFFER_REJECTED]: 'ไม่ยอมรับข้อเสนอ',
}
type ApplicationColorMap = Record<
  ApplicationStatus,
  'orange' | 'green' | 'red' | 'black'
>

export const APPLICATION_COLOR: ApplicationColorMap = {
  [ApplicationStatus.PENDING]: 'orange',
  [ApplicationStatus.OFFER_SENT]: 'green',
  [ApplicationStatus.REJECTED]: 'red',
  [ApplicationStatus.OFFER_ACCEPTED]: 'green',
  [ApplicationStatus.OFFER_REJECTED]: 'red',
}

export const APPLICATION_OUTLINE = {
  [ApplicationStatus.PENDING]: false,
  [ApplicationStatus.OFFER_SENT]: false,
  [ApplicationStatus.REJECTED]: false,
  [ApplicationStatus.OFFER_ACCEPTED]: true,
  [ApplicationStatus.OFFER_REJECTED]: true,
}
