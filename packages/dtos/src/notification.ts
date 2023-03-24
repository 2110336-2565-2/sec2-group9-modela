import { NotificationType } from '@modela/database'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator'

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

export class GetNotificationDto {
  @ApiProperty()
  maxPage: number

  @ApiProperty({ isArray: true })
  notifications: NotificationDto[]
}

export class GetNotificationsQuery {
  @ApiPropertyOptional({ enum: NotificationType, isArray: true })
  @IsOptional()
  @IsEnum(NotificationType, { each: true })
  type?: NotificationType[]

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(20)
  @ApiPropertyOptional({
    default: 10,
  })
  limit: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiPropertyOptional({
    default: 1,
  })
  page: number
}
