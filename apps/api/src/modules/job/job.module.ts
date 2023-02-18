import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/database/prisma.module'

import { ApplicationModule } from './application/application.module'
import { JobController } from './job.controller'
import { JobRepository } from './job.repository'
import { JobService } from './job.service'

@Module({
  imports: [PrismaModule, ApplicationModule],
  controllers: [JobController],
  providers: [JobService, JobRepository],
  exports: [JobRepository],
})
export class JobModule {}
