import { ApplicationStatus } from '@modela/database'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsOptional, IsString } from 'class-validator'

export class ActorDto {
  @ApiProperty()
  applicationId: number

  @ApiProperty()
  actorId: number

  @ApiProperty()
  firstName: string

  @ApiProperty()
  middleName?: string

  @ApiProperty()
  lastName: string

  @ApiProperty()
  resumeUrl: string

  @ApiProperty()
  profileImageUrl?: string

  @ApiProperty()
  description?: string

  @ApiProperty()
  status?: ApplicationStatus
}

export class GetAppliedActorDto {
  @ApiProperty({ type: ActorDto, isArray: true })
  actors: ActorDto[]
}

export class GetAppliedActorQuery {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string

  @ApiPropertyOptional({ enum: ApplicationStatus, isArray: true })
  @IsOptional()
  @IsEnum(ApplicationStatus, { each: true })
  status?: ApplicationStatus[]
}

export class GetApplicationId {
  @ApiProperty()
  applicationId: number
}
