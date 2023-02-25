import { ApiProperty } from '@nestjs/swagger'

export class UploadUrlDto {
  @ApiProperty()
  signedUrl: string

  @ApiProperty()
  publicUrl: string
}
