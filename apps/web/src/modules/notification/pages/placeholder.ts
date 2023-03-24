import { NotificationType } from '@modela/dtos'

export const notiHolder = new Array({
  type: NotificationType.REJECTOFFER,
  jobTitle: 'TEST1234',
  companyName: 'PRIAS THE ANIMATION',
  reason: 'LAZY',
  isRead: true,
  url: 'string',
  actor: {
    firstName: 'PRIAS',
    middleName: 'DEVO',
    lastName: 'HALO',
  },
  timestamp: new Date(),
})
