import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/database/prisma.module'

import { NotificationController } from './notification.controller'
import { NotificationRepository } from './notification.repository'
import { NotificationService } from './notification.service'

@Module({
  imports: [PrismaModule],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationRepository],
  exports: [NotificationService],
})
export class NotificationModule {}
