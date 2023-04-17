import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from 'src/database/prisma.service'

import { FileService } from '../file/file.service'
import { ApplicationRepository } from '../job/application/application.repository'
import { JobRepository } from '../job/job.repository'
import { NotificationModule } from '../notification/notification.module'
import { UserRepository } from '../user/user.repository'
import { RefundRepository } from './refund.repository'
import { RefundService } from './refund.service'

describe('RefundService', () => {
  let service: RefundService
  /*
  let repository: RefundRepository
  let jobRepository: JobRepository
  let applicationRepository: ApplicationRepository
  let notificationService: NotificationService
  */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefundService,
        RefundRepository,
        PrismaService,
        JobRepository,
        ApplicationRepository,
        UserRepository,
        FileService,
        ConfigService,
      ],
      imports: [NotificationModule],
    }).compile()

    service = module.get<RefundService>(RefundService)
    /*
    repository = module.get<RefundRepository>(RefundRepository)
    jobRepository = module.get<JobRepository>(JobRepository)
    applicationRepository = module.get<ApplicationRepository>(
      ApplicationRepository,
    )
    notificationService = module.get<NotificationService>(NotificationService)
    */
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
