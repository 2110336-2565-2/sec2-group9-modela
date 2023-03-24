import { NotificationType } from '@modela/dtos'

export const actorBodyMap = {
  [NotificationType.REJECTOFFER]: 'รายละเอียดงาน: ',
  [NotificationType.RECEIVEOFFER]: 'รายละเอียดงาน: ',
  [NotificationType.APPROVEREFUND]: 'เหตุผล: ',
  [NotificationType.REJECTREFUND]: '',
  [NotificationType.ACCEPTOFFER]: '',
  [NotificationType.CANCELJOB]: '',
}

export const castingBodyMap = {
  [NotificationType.ACCEPTOFFER]: 'ดูรายละเอียดนักแสดง: ',
  [NotificationType.REJECTOFFER]: 'ดูรายละเอียดนักแสดง: ',
  [NotificationType.APPROVEREFUND]: 'รายละเอียดงาน: ',
  [NotificationType.REJECTREFUND]: 'รายละเอียดงาน:',
  [NotificationType.RECEIVEOFFER]: '',
  [NotificationType.CANCELJOB]: '',
}
