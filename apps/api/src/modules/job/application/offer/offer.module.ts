import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/database/prisma.module'

import { ApplicationModule } from '../application.module'
import { OfferController } from './offer.controller'
import { OfferRepository } from './offer.repository'
import { OfferService } from './offer.service'

@Module({
  imports: [ApplicationModule, PrismaModule],
  controllers: [OfferController],
  providers: [OfferService, OfferRepository],
})
export class OfferModule {}
