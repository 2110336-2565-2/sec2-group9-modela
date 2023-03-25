import { NotificationType } from '@modela/dtos'

export const notiHolder = new Array(
  {
    type: NotificationType.RECEIVEOFFER,
    reason: 'LAZY',
    isRead: true,
    url: 'string',
    actor: {
      firstName: 'PRIAS',
      middleName: 'DEVO',
      lastName: 'HALO',
    },
    job: {
      jobTitle: 'TEST1234',
      companyName: 'Prias The Animation',
    },
    timestamp: new Date(),
  },
  {
    type: NotificationType.RECEIVEOFFER,
    reason: 'LAZY',
    isRead: true,
    url: 'string',
    actor: {
      firstName: 'PRIAS',
      middleName: 'DEVO',
      lastName: 'HALO',
    },
    job: {
      jobTitle: 'TEST1234',
      companyName: 'Prias The Animation',
    },
    timestamp: new Date(),
  },
)
