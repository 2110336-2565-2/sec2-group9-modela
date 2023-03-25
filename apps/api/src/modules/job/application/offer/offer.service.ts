import { Injectable } from '@nestjs/common'

@Injectable()
export class OfferService {
  constructor(private readonly OfferRepository) {}
}
