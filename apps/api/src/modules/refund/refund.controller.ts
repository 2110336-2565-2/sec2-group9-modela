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
import { RefundService } from './refund.service'

@ApiTags('refunds')
@Controller('refunds')
export class RefundController {
  constructor(private readonly refundService: RefundService) {}

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
}
