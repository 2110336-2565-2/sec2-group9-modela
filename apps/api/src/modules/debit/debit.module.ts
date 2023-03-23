import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/database/prisma.module'

import { ApplicationModule } from '../job/application/application.module'
import { JobModule } from '../job/job.module'
import { DebitController } from './debit.controller'
import { DebitRepository } from './debit.repository'
import { DebitService } from './debit.service'

@Module({
  imports: [PrismaModule, ApplicationModule, JobModule],
  controllers: [DebitController],
  providers: [DebitService, DebitRepository],
})
export class DebitModule {}
