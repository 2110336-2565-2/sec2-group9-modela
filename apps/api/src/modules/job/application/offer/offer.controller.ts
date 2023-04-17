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
  @ApiOkResponse({ description: 'Job offer sent' })
  @ApiBadRequestResponse({
    description:
      'Actor has not applied to this job or an offer has already been sent.',
  })
  @ApiUnauthorizedResponse({
    description: 'User is not logged in',
  })
  @ApiForbiddenResponse({
    description: 'User is not the owner of this job or is not a casting',
  })
  @ApiNotFoundResponse({ description: 'Job not found' })
  async sendJobOffer(
    @Param('jobId') jobId: string,
    @Param('actorId') actorId: string,
    @User() user: JwtDto,
  ) {
    return await this.offerService.sendJobOffer(+jobId, user.userId, +actorId)
  }

  @Put('/:jobId/offer/accept')
  @UseAuthGuard(UserType.ACTOR)
  @ApiOperation({ summary: 'Accepts a job offer' })
  @ApiOkResponse({ description: 'Job offer accepted' })
  @ApiBadRequestResponse({
    description:
      'You have not applied to this job, have already accepted this job offer or cannot accept this job offer',
  })
  @ApiUnauthorizedResponse({
    description: 'User is not logged in',
  })
  @ApiForbiddenResponse({
    description: 'User is not an actor',
  })
  @ApiNotFoundResponse({ description: 'Job not found' })
  async acceptJobOffer(@Param('jobId') jobId: string, @User() user: JwtDto) {
    return await this.offerService.acceptJobOffer(+jobId, user.userId)
  }

  @Put('/:jobId/offer/reject')
  @UseAuthGuard(UserType.ACTOR)
  @ApiOperation({ summary: 'Rejects a job offer' })
  @ApiOkResponse({ description: 'Job offer rejected' })
  @ApiBadRequestResponse({
    description:
      'You have not applied to this job, have already rejected this job offer or cannot reject this job offer',
  })
  @ApiUnauthorizedResponse({
    description: 'User is not logged in',
  })
  @ApiForbiddenResponse({
    description: 'User is not an actor',
  })
  @ApiNotFoundResponse({ description: 'Job not found' })
  async rejectJobOffer(@Param('jobId') jobId: string, @User() user: JwtDto) {
    return await this.offerService.rejectJobOffer(+jobId, user.userId)
  }
}
