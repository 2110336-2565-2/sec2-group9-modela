import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from 'src/database/prisma.service'

import { NotificationRepository } from './notification.repository'
import { NotificationService } from './notification.service'

describe('NotificationService', () => {
  let service: NotificationService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationService, NotificationRepository, PrismaService],
    }).compile()

    service = module.get<NotificationService>(NotificationService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
