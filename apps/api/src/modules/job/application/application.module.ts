import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/database/prisma.module'

import { JobModule } from '../job.module'
import { ApplicationController } from './application.controller'
import { ApplicationRepository } from './application.repository'
import { ApplicationService } from './application.service'

@Module({
  imports: [PrismaModule, JobModule],
  controllers: [ApplicationController],
  providers: [ApplicationService, ApplicationRepository],
  exports: [ApplicationRepository],
})
export class ApplicationModule {}
