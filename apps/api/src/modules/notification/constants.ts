import { NotificationType, Prisma } from '@modela/database'

const jobQuery: Prisma.NotificationSelect = {
  Job: {
    select: {
      jobId: true,
      title: true,
      Casting: {
        select: {
          companyName: true,
        },
      },
    },
  },
}

const jobTitleQuery: Prisma.NotificationSelect = {
  Job: {
    select: {
      jobId: true,
      title: true,
    },
  },
}

const actorQuery: Prisma.NotificationSelect = {
  Actor: {
    select: {
      actorId: true,
      User: {
        select: {
          firstName: true,
          middleName: true,
          lastName: true,
        },
      },
    },
  },
}

export const ActorNotificationSchema: {
  [key in NotificationType]?: Prisma.NotificationSelect
} = {
  [NotificationType.CANCEL_JOB]: jobQuery,
  [NotificationType.RECEIVE_OFFER]: jobQuery,
  [NotificationType.ACCEPT_OFFER]: jobQuery,
  [NotificationType.REJECT_OFFER]: jobQuery,
  [NotificationType.APPROVE_REFUND]: {
    ...jobQuery,
    Refund: {
      select: {
        reason: true,
      },
    },
  },
}

export const CastingNotificationSchema: {
  [key in NotificationType]?: Prisma.NotificationSelect
} = {
  [NotificationType.CANCEL_JOB]: jobQuery,
  [NotificationType.REJECT_OFFER]: {
    ...jobTitleQuery,
    ...actorQuery,
  },
  [NotificationType.ACCEPT_OFFER]: {
    ...jobTitleQuery,
    ...actorQuery,
  },
  [NotificationType.APPROVE_REFUND]: {
    ...jobQuery,
    ...actorQuery,
  },
  [NotificationType.REJECT_REFUND]: {
    ...jobQuery,
    ...actorQuery,
  },
}

export interface IFindNotification {
  Job?: {
    jobId: number
    title: string
    Casting?: {
      companyName: string
    }
  }
  Actor?: {
    actorId: number
    User?: {
      firstName: string
      middleName: string
      lastName: string
    }
  }
  Refund?: {
    reason: string
  }
}
