import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/database/prisma.module'
import { NotificationModule } from 'src/modules/notification/notification.module'

import { JobModule } from '../../job.module'
import { ApplicationModule } from '../application.module'
import { OfferController } from './offer.controller'
import { OfferService } from './offer.service'

@Module({
  imports: [ApplicationModule, JobModule, PrismaModule, NotificationModule],
  controllers: [OfferController],
  providers: [OfferService],
})
export class OfferModule {}
