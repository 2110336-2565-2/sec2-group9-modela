import { JwtDto, UserType } from '@modela/dtos'
import { Controller, Param, Put } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { UseAuthGuard } from 'src/modules/auth/misc/jwt.decorator'
import { User } from 'src/modules/auth/misc/user.decorator'

import { OfferService } from './offer.service'

@ApiTags('offer')
@Controller('jobs')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Put('/:jobId/actors/:actorId/offer')
  @UseAuthGuard(UserType.CASTING)
  @ApiOperation({ summary: 'Sends a job offer to actor' })
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description:
      'Actor has not applied to this job or an offer has already been sent.',
  })
  @ApiUnauthorizedResponse({
    description: 'User is not logged in or is not a casting',
  })
  @ApiForbiddenResponse({ description: 'User is not the owner of this job' })
  @ApiNotFoundResponse({ description: 'Job not found' })
  sendJobOffer(
    @Param('jobId') jobId: number,
    @Param('actorId') actorId: number,
    @User() user: JwtDto,
  ) {
    return this.offerService.sendJobOffer(+jobId, user.userId, +actorId)
  }
}
