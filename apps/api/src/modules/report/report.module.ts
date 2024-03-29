import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/database/prisma.module'

import { JobModule } from '../job/job.module'
import { NotificationModule } from '../notification/notification.module'
import { ReportController } from './report.controller'
import { ReportRepository } from './report.repository'
import { ReportService } from './report.service'

@Module({
  imports: [JobModule, PrismaModule, NotificationModule],
  controllers: [ReportController],
  providers: [ReportService, ReportRepository],
})
export class ReportModule {}
