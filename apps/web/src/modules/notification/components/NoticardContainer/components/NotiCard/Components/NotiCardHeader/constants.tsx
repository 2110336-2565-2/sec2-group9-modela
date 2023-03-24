import { NotificationType } from '@modela/dtos'
import {
  AttachMoney,
  Block,
  Check,
  Close,
  MoneyOffCsred,
} from '@mui/icons-material'
export const actorIconMap = {
  [NotificationType.REJECTOFFER]: <Close sx={{ fontSize: '40px' }} />,
  [NotificationType.RECEIVEOFFER]: <Check sx={{ fontSize: '40px' }} />,
  [NotificationType.CANCELJOB]: <Block sx={{ fontSize: '40px' }} />,
  [NotificationType.APPROVEREFUND]: <MoneyOffCsred sx={{ fontSize: '40px' }} />,
  [NotificationType.REJECTREFUND]: <></>,
  [NotificationType.ACCEPTOFFER]: <></>,
}

export const castingIconMap = {
  [NotificationType.ACCEPTOFFER]: <Check sx={{ fontSize: '40px' }} />,
  [NotificationType.REJECTOFFER]: <Close sx={{ fontSize: '40px' }} />,
  [NotificationType.CANCELJOB]: <Block sx={{ fontSize: '40px' }} />,
  [NotificationType.APPROVEREFUND]: <AttachMoney sx={{ fontSize: '40px' }} />,
  [NotificationType.REJECTREFUND]: <MoneyOffCsred sx={{ fontSize: '40px' }} />,
  [NotificationType.RECEIVEOFFER]: <></>,
}

export const actorHeaderMap = {
  [NotificationType.REJECTOFFER]: 'ถูกปฏิเสธ: ',
  [NotificationType.RECEIVEOFFER]: 'ได้รับข้อเสนองาน: ',
  [NotificationType.CANCELJOB]: 'งานถูกยกเลิก: ',
  [NotificationType.APPROVEREFUND]: 'ถูกระงับเงินจากงาน: ',
  [NotificationType.REJECTREFUND]: '',
  [NotificationType.ACCEPTOFFER]: '',
}

export const castingHeaderMap = {
  [NotificationType.ACCEPTOFFER]: 'นักแสดงรับข้อเสนองาน: ',
  [NotificationType.REJECTOFFER]: 'นักแสดงปฏิเสธข้อเสนองาน: ',
  [NotificationType.CANCELJOB]: 'งานถูกยกเลิก: ',
  [NotificationType.APPROVEREFUND]: 'การขอเงินคืนสำเร็จ: ',
  [NotificationType.REJECTREFUND]: 'การขอเงินคืนไม่สำเร็จ:',
  [NotificationType.RECEIVEOFFER]: '',
}
