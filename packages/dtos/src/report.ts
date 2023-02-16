import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class PostReportDto {
  @ApiProperty()
  @IsString()
  reason: string
}
