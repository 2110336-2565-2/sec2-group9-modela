import { Module } from '@nestjs/common'

import { OfferController } from './offer.controller'
import { OfferRepository } from './offer.repository'
import { OfferService } from './offer.service'

@Module({
  imports: [],
  controllers: [OfferController],
  providers: [OfferService, OfferRepository],
})
export class OfferModule {}
