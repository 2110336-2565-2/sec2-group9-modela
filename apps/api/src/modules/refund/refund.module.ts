import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/database/prisma.module'

import { ApplicationModule } from '../job/application/application.module'
import { JobModule } from '../job/job.module'
import { NotificationModule } from '../notification/notification.module'
import { UserModule } from '../user/user.module'
import { RefundController } from './refund.controller'
import { RefundRepository } from './refund.repository'
import { RefundService } from './refund.service'

@Module({
  imports: [
    PrismaModule,
    ApplicationModule,
    JobModule,
    NotificationModule,
    UserModule,
  ],
  controllers: [RefundController],
  providers: [RefundService, RefundRepository],
  exports: [RefundRepository],
})
export class RefundModule {}
