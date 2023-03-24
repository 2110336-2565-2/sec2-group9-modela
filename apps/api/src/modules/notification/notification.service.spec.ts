import { NotificationType, UserType } from '@modela/database'
import { NotificationDto } from '@modela/dtos'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from 'src/database/prisma.service'

import { NotificationRepository } from './notification.repository'
import { NotificationService } from './notification.service'

describe('NotificationService', () => {
  let service: NotificationService
  let repository: NotificationRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationService, NotificationRepository, PrismaService],
    }).compile()

    service = module.get<NotificationService>(NotificationService)
    repository = module.get<NotificationRepository>(NotificationRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getNotifications', () => {
    const MOCK_NOTIFICATIONS = [
      { type: NotificationType.ACCEPT_OFFER },
      { type: NotificationType.CANCEL_JOB },
    ] as NotificationDto[]
    const MOCK_NOTIFICATION_COUNT = 10
    const MOCK_QUERY = {
      type: [NotificationType.ACCEPT_OFFER],
      page: 2,
      limit: 3,
    }
    const MOCK_USER_ID = 1

    beforeEach(() => {
      jest
        .spyOn(repository, 'getNotifications')
        .mockResolvedValue(MOCK_NOTIFICATIONS)

      jest
        .spyOn(repository, 'getNotificationCount')
        .mockResolvedValue(MOCK_NOTIFICATION_COUNT)
    })

    it('should return notification array correctly', async () => {
      const result = await service.getNotifications(
        MOCK_USER_ID,
        UserType.ACTOR,
        MOCK_QUERY,
      )

      expect(result).toEqual({
        maxPage: 4,
        notifications: MOCK_NOTIFICATIONS,
      })

      expect(repository.getNotifications).toBeCalledWith(
        MOCK_USER_ID,
        UserType.ACTOR,
        MOCK_QUERY.type,
        3,
        3,
      )
    })

    it('should init limit and page correctly', async () => {
      const result = await service.getNotifications(
        MOCK_USER_ID,
        UserType.ACTOR,
        {},
      )

      expect(result).toEqual({
        maxPage: 1,
        notifications: MOCK_NOTIFICATIONS,
      })

      expect(repository.getNotifications).toBeCalledWith(
        MOCK_USER_ID,
        UserType.ACTOR,
        undefined,
        0,
        10,
      )
    })
  })
})
