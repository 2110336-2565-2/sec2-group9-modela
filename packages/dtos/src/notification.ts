import { NotificationType } from '@modela/database'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class SendNotificationDto {
  @ApiProperty()
  userId: number

  @ApiProperty()
  type: NotificationType

  @ApiPropertyOptional()
  actorId?: number

  @ApiPropertyOptional()
  jobId?: number

  @ApiPropertyOptional()
  refundId?: number
}
