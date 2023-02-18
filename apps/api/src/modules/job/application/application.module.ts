import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/database/prisma.module'

import { JobRepository } from '../job.repository'
import { ApplicationController } from './application.controller'
import { ApplicationRepository } from './application.repository'
import { ApplicationService } from './application.service'

@Module({
  imports: [PrismaModule],
  controllers: [ApplicationController],
  providers: [ApplicationService, ApplicationRepository, JobRepository],
  exports: [ApplicationRepository],
})
export class ApplicationModule {}
