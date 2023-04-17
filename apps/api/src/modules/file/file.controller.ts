import { FileNameDto, UploadUrlDto } from '@modela/dtos'
import { Controller, Get, Query } from '@nestjs/common'
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { UseAuthGuard } from '../auth/misc/jwt.decorator'
import { FileService } from './file.service'

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('upload')
  @UseAuthGuard()
  @ApiOperation({ summary: 'get signed url for upload' })
  @ApiOkResponse({ type: UploadUrlDto })
  @ApiUnauthorizedResponse({ description: 'User is not login' })
  @ApiForbiddenResponse({ description: 'User is not verified' })
  getUploadUrl(@Query() fileNameDto: FileNameDto) {
    return this.fileService.getUploadUrl(fileNameDto.fileName)
  }
}
