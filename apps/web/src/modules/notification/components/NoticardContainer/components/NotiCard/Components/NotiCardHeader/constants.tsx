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
