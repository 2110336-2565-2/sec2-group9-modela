import { UserType } from '@modela/database'
import { GetJobCardDto } from '@modela/dtos'
import { Controller, Get } from '@nestjs/common'
import {
  ApiForbiddenResponse,
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
  @ApiForbiddenResponse({ description: 'User is not an casting' })
  @ApiOkResponse({ type: GetJobCardDto, isArray: true })
  @ApiOperation({ summary: 'Casting get list of unpaid jobs' })
  getUnpaidJob(@User() user) {
    return this.creditService.getUnpaidJob(user.id)
  }
}
