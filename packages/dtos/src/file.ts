import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class UploadUrlDto {
  @ApiProperty()
  signedUrl: string

  @ApiProperty()
  publicUrl: string
}

export class FileNameDto {
  @ApiProperty()
  @IsString()
  fileName: string
}
