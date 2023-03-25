import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('offer')
@Controller('offer')
export class OfferController {
  constructor(private readonly OfferService) {}
}
