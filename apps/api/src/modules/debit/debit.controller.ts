import { UserType } from '@modela/database'
import {
  GetPendingActorDebitsByJobDto,
  GetPendingJobsDebitsDto,
} from '@modela/dtos'
import { Controller, Get, Param, Put } from '@nestjs/common'
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

  @Get('/jobs')
  @UseAuthGuard(UserType.ADMIN)
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  @ApiForbiddenResponse({ description: 'User is not an admin' })
  @ApiOkResponse({ type: GetPendingJobsDebitsDto, isArray: true })
  @ApiOperation({
    summary: 'admin get list of finished job with pending actor transaction',
  })
  getPendingJobsDebits() {
    return this.debitService.getPendingJobsDebits()
  }

  @Get('/jobs/:jobId/actors')
  @UseAuthGuard(UserType.ADMIN)
  @ApiBadRequestResponse({ description: 'Job status is not finished' })
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  @ApiNotFoundResponse({ description: 'Job not found' })
  @ApiForbiddenResponse({ description: 'User is not an admin' })
  @ApiOkResponse({ type: GetPendingActorDebitsByJobDto })
  @ApiOperation({
    summary: 'admin get pending actor transaction of a specified job',
  })
  getPendingDebitsByJobId(@Param('jobId') jobId: string) {
    return this.debitService.getPendingDebitsByJobId(+jobId)
  }
}
