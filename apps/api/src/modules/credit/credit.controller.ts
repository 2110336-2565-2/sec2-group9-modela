import { UserType } from '@modela/database'
import {
  GetJobCardDto,
  GetPendingTransactionDto,
  JwtDto,
  SendProofOfTransactionDto,
} from '@modela/dtos'
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
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
import { User } from '../auth/misc/user.decorator'
import { CreditService } from './credit.service'

@ApiTags('credits')
@Controller('credits')
export class CreditController {
  constructor(private readonly creditService: CreditService) {}

  @Get('/jobs')
  @UseAuthGuard(UserType.CASTING)
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  @ApiForbiddenResponse({ description: 'User is not a casting' })
  @ApiOkResponse({ type: GetJobCardDto, isArray: true })
  @ApiOperation({ summary: 'Casting get list of unpaid jobs' })
  getUnpaidJob(@User() user) {
    return this.creditService.getUnpaidJob(user.id)
  }

  @Get('/')
  @UseAuthGuard(UserType.ADMIN)
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  @ApiForbiddenResponse({ description: 'User is not an admin' })
  @ApiOkResponse({ type: GetPendingTransactionDto, isArray: true })
  @ApiOperation({ summary: 'Admin get list of pending casting transaction' })
  getPendingTransactions() {
    return this.creditService.getPendingTransactions()
  }

  @Get('/jobs/:jobId')
  @UseAuthGuard(UserType.CASTING)
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  @ApiForbiddenResponse({ description: 'User is not a casting' })
  @ApiNotFoundResponse({ description: 'Job not found' })
  @ApiBadRequestResponse({ description: 'Job status is not selection end' })
  @ApiOperation({ summary: 'Casting get transaction detail for job' })
  getTransactionDetail(@Param('jobId') jobId: string, @User() user: JwtDto) {
    return this.creditService.getTransactionDetail(+jobId, user.userId)
  }

  @Post('/jobs/:jobId')
  @UseAuthGuard(UserType.CASTING)
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  @ApiForbiddenResponse({ description: 'User is not a casting' })
  @ApiNotFoundResponse({ description: 'Job not found' })
  @ApiBadRequestResponse({ description: 'Job status is not selection end' })
  @ApiOperation({ summary: 'Casting post proof of transaction for job' })
  sendProofOfTransaction(
    @Param('jobId') jobId: string,
    @Body() body: SendProofOfTransactionDto,
    @User() user: JwtDto,
  ) {
    return this.creditService.sendProofOfTransaction(+jobId, body, user.userId)
  }

  @Put('/jobs/:jobId/accept')
  @UseAuthGuard(UserType.ADMIN)
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  @ApiForbiddenResponse({ description: 'User is not an admin' })
  @ApiNotFoundResponse({ description: 'job not found' })
  @ApiBadRequestResponse({ description: 'no pending transaction of this job' })
  @ApiOperation({ summary: 'Admin accept pending casting transaction' })
  acceptPendingTransactions(@Param('jobId') jobId: string) {
    return this.creditService.updatePendingTransactions(+jobId, true)
  }

  @Put('/jobs/:jobId/reject')
  @UseAuthGuard(UserType.ADMIN)
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  @ApiForbiddenResponse({ description: 'User is not an admin' })
  @ApiNotFoundResponse({ description: 'job not found' })
  @ApiBadRequestResponse({ description: 'no pending transaction of this job' })
  @ApiOperation({ summary: 'Admin reject pending casting transaction' })
  rejectPendingTransactions(@Param('jobId') jobId: string) {
    return this.creditService.updatePendingTransactions(+jobId, false)
  }
}
