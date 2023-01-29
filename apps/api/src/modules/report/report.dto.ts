import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class PostReportDTO {
  @ApiProperty()
  @IsString()
  reason: string
}
