import { NotificationType } from '@modela/dtos'
import {
  AttachMoney,
  Block,
  Check,
  Close,
  MoneyOffCsred,
} from '@mui/icons-material'
export const ACTOR_ICON_MAP = {
  [NotificationType.REJECT_APPLICATION]: <Close sx={{ fontSize: '40px' }} />,
  [NotificationType.RECEIVE_OFFER]: <Check sx={{ fontSize: '40px' }} />,
  [NotificationType.CANCEL_JOB]: <Block sx={{ fontSize: '40px' }} />,
  [NotificationType.APPROVE_REFUND]: (
    <MoneyOffCsred sx={{ fontSize: '40px' }} />
  ),
  [NotificationType.REJECT_REFUND]: <></>,
  [NotificationType.ACCEPT_OFFER]: <></>,
  [NotificationType.REJECT_OFFER]: <></>,
}

export const CASTING_ICON_MAP = {
  [NotificationType.ACCEPT_OFFER]: <Check sx={{ fontSize: '40px' }} />,
  [NotificationType.REJECT_OFFER]: <Close sx={{ fontSize: '40px' }} />,
  [NotificationType.CANCEL_JOB]: <Block sx={{ fontSize: '40px' }} />,
  [NotificationType.APPROVE_REFUND]: <AttachMoney sx={{ fontSize: '40px' }} />,
  [NotificationType.REJECT_REFUND]: <MoneyOffCsred sx={{ fontSize: '40px' }} />,
  [NotificationType.RECEIVE_OFFER]: <></>,
  [NotificationType.REJECT_APPLICATION]: <></>,
}

export const ACTOR_HEADER_MAP = {
  [NotificationType.REJECT_APPLICATION]: 'ถูกปฏิเสธ: ',
  [NotificationType.RECEIVE_OFFER]: 'ได้รับข้อเสนองาน: ',
  [NotificationType.CANCEL_JOB]: 'งานถูกยกเลิก: ',
  [NotificationType.APPROVE_REFUND]: 'ถูกระงับเงินจากงาน: ',
  [NotificationType.REJECT_REFUND]: '',
  [NotificationType.ACCEPT_OFFER]: '',
  [NotificationType.REJECT_OFFER]: '',
}

export const CASTING_HEADER_MAP = {
  [NotificationType.ACCEPT_OFFER]: 'นักแสดงรับข้อเสนองาน: ',
  [NotificationType.REJECT_OFFER]: 'นักแสดงปฏิเสธข้อเสนองาน: ',
  [NotificationType.CANCEL_JOB]: 'งานถูกยกเลิก: ',
  [NotificationType.APPROVE_REFUND]: 'การขอเงินคืนสำเร็จ: ',
  [NotificationType.REJECT_REFUND]: 'การขอเงินคืนไม่สำเร็จ:',
  [NotificationType.RECEIVE_OFFER]: '',
  [NotificationType.REJECT_APPLICATION]: '',
}
