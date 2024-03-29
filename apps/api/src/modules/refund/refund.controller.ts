import { UserType } from '@modela/database'
import {
  JwtDto,
  PendingRefundDto,
  RequestRefundInfoDto,
  SendRefundDto,
} from '@modela/dtos'
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { UseAuthGuard } from '../auth/misc/jwt.decorator'
import { User } from '../auth/misc/user.decorator'
import { RefundService } from './refund.service'

@ApiTags('refunds')
@Controller('refunds')
export class RefundController {
  constructor(private readonly refundService: RefundService) {}

  @Get()
  @UseAuthGuard(UserType.ADMIN)
  @ApiOperation({ summary: 'admin get pending refund list' })
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  @ApiForbiddenResponse({ description: 'User is not an admin' })
  @ApiOkResponse({ type: PendingRefundDto, isArray: true })
  getPendingRefunds() {
    return this.refundService.getPendingRefunds()
  }

  @Get('/jobs/:jobId/actors/:actorId')
  @UseAuthGuard(UserType.CASTING)
  @ApiBadRequestResponse({
    description:
      "actor didn't apply for this job or job status is not selection end or this job not paid",
  })
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  @ApiNotFoundResponse({ description: 'Job not found' })
  @ApiForbiddenResponse({ description: 'User is not a casting or owner' })
  @ApiOkResponse({ type: RequestRefundInfoDto })
  @ApiOperation({ summary: 'casting get request refund info' })
  getRefundInfo(
    @Param('jobId') jobId: string,
    @Param('actorId') actorId: string,
    @User() user: JwtDto,
  ) {
    return this.refundService.getRefundInfo(+jobId, +actorId, user.userId)
  }

  @Post('/jobs/:jobId/actors/:actorId')
  @UseAuthGuard(UserType.CASTING)
  @ApiBadRequestResponse({
    description:
      "actor didn't apply for this job or job status is not selection end or this job not paid",
  })
  @ApiConflictResponse({
    description: 'already refund request of this actor in this job',
  })
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  @ApiNotFoundResponse({ description: 'Job not found' })
  @ApiForbiddenResponse({ description: 'User is not a casting or owner' })
  @ApiOkResponse()
  @ApiOperation({ summary: 'casting makes request refund' })
  sendRefund(
    @Param('jobId') jobId: string,
    @Param('actorId') actorId: string,
    @Body() body: SendRefundDto,
    @User() user: JwtDto,
  ) {
    return this.refundService.sendRefund(+jobId, +actorId, body, user.userId)
  }

  @Put('/jobs/:jobId/actors/:actorId/accept')
  @UseAuthGuard(UserType.ADMIN)
  @ApiBadRequestResponse({
    description: 'no refund request of this actor in this job',
  })
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  @ApiNotFoundResponse({ description: 'Job not found' })
  @ApiForbiddenResponse({ description: 'User is not an admin' })
  @ApiOkResponse()
  @ApiOperation({ summary: 'admin accept refund request' })
  acceptRefund(
    @Param('jobId') jobId: number,
    @Param('actorId') actorId: number,
  ) {
    return this.refundService.acceptRefund(+jobId, +actorId)
  }

  @Put('/jobs/:jobId/actors/:actorId/reject')
  @UseAuthGuard(UserType.ADMIN)
  @ApiBadRequestResponse({
    description: 'no refund request of this actor in this job',
  })
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  @ApiNotFoundResponse({ description: 'Job not found' })
  @ApiForbiddenResponse({ description: 'User is not an admin' })
  @ApiOkResponse()
  @ApiOperation({ summary: 'admin reject refund request' })
  rejectRefund(
    @Param('jobId') jobId: number,
    @Param('actorId') actorId: number,
  ) {
    return this.refundService.rejectRefund(+jobId, +actorId)
  }
}
