import { NotificationType } from '@modela/dtos'

export const actorBodyMap = {
  [NotificationType.REJECT_OFFER]: '',
  [NotificationType.RECEIVE_OFFER]: 'รายละเอียดงาน: ',
  [NotificationType.APPROVE_REFUND]: 'เหตุผล: ',
  [NotificationType.REJECT_REFUND]: '',
  [NotificationType.ACCEPT_OFFER]: '',
  [NotificationType.CANCEL_JOB]: '',
  [NotificationType.REJECT_APPLICATION]: 'รายละเอียดงาน: ',
}

export const castingBodyMap = {
  [NotificationType.ACCEPT_OFFER]: 'ดูรายละเอียดนักแสดง: ',
  [NotificationType.REJECT_OFFER]: 'ดูรายละเอียดนักแสดง: ',
  [NotificationType.APPROVE_REFUND]: 'รายละเอียดงาน: ',
  [NotificationType.REJECT_REFUND]: 'รายละเอียดงาน:',
  [NotificationType.RECEIVE_OFFER]: '',
  [NotificationType.CANCEL_JOB]: '',
  [NotificationType.REJECT_APPLICATION]: '',
}
