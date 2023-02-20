import { Body, Controller, Get } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptional, ApiTags } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { Express } from 'express'

import { UseAuthGuard } from '../auth/misc/jwt.decorator'
import { CheckedFile, UseFileUpload } from './file.decorator'
import { FileService } from './file.service'

export class testDataDto {
  @ApiProperty()
  @IsString()
  test: string
}

export class testDto extends testDataDto {
  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  file: Express.Multer.File
}

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('upload')
  @UseAuthGuard()
  getUploadUrl(fileName: string) {
    return this.fileService.getUploadUrl(fileName)
  }

  @UseFileUpload()
  postUploadFile(
    @Body() body: testDto,
    @CheckedFile()
    file: Express.Multer.File,
  ) {
    console.log('body')
    console.log(body)
    console.log('file')
    console.log(file)
    const testf = (body: testDataDto) => {
      console.log(body)
    }
    delete body.file
    testf(body)
    return this.fileService.postUploadFile(file)
  }

  getDownloadUrl() {
    return this.fileService.getDownloadUrl('public/test2.png')
  }
}
