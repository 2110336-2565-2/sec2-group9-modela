import { forwardRef, Module } from '@nestjs/common'
import { PrismaModule } from 'src/database/prisma.module'

import { RefundModule } from '../refund/refund.module'
import { JobController } from './job.controller'
import { JobRepository } from './job.repository'
import { JobService } from './job.service'

@Module({
  imports: [PrismaModule, forwardRef(() => RefundModule)],
  controllers: [JobController],
  providers: [JobService, JobRepository],
  exports: [JobRepository],
})
export class JobModule {}
