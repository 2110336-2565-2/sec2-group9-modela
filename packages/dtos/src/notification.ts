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

export class NotificationActorDto {
  @ApiProperty()
  actorId: number

  @ApiProperty()
  firstName: string

  @ApiProperty()
  middleName: string

  @ApiProperty()
  lastName: string
}

export class NotificationJobDto {
  @ApiProperty()
  jobId: number

  @ApiProperty()
  title: string

  @ApiPropertyOptional()
  companyName?: string
}

export class NotificationDto {
  @ApiPropertyOptional()
  actor?: NotificationActorDto

  @ApiPropertyOptional()
  job?: NotificationJobDto

  @ApiProperty({ enum: NotificationType })
  type: NotificationType

  @ApiPropertyOptional()
  reason?: string

  @ApiProperty()
  createdAt: Date
}
