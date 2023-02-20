import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { UseAuthGuard } from '../auth/misc/jwt.decorator'
import { FileService } from './file.service'

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('upload')
  @UseAuthGuard()
  getUploadUrl(fileName: string) {
    return this.fileService.getUploadUrl(fileName)
  }
}
