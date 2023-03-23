import { UserType } from '@modela/database'
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

import { UseAuthGuard } from '../auth/misc/jwt.decorator'
import { DebitService } from './debit.service'

@ApiTags('debits')
@Controller('debits')
export class DebitController {
  constructor(private readonly debitService: DebitService) {}

  @Put('/jobs/:jobId/actors/:actorId/accept')
  @UseAuthGuard(UserType.ADMIN)
  @ApiBadRequestResponse({
    description:
      'Actor didn’t apply for this job or application status is not offer accept or job status is not finished or already mark this transaction or already refund',
  })
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  @ApiNotFoundResponse({ description: 'Job not found' })
  @ApiForbiddenResponse({ description: 'User is not an admin' })
  @ApiOkResponse()
  @ApiOperation({ summary: 'admin mark actor transaction as resolved' })
  markAsPaid(@Param('jobId') jobId: string, @Param('actorId') actorId: string) {
    return this.debitService.markAsPaid(+jobId, +actorId)
  }
}
