import { ApplicationStatus } from '@modela/database'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator'

export class ActorDto {
  @ApiProperty()
  applicationId: number

  @ApiProperty()
  actorId: number

  @ApiProperty()
  firstName: string

  @ApiPropertyOptional()
  middleName?: string

  @ApiProperty()
  lastName: string

  @ApiProperty()
  resumeUrl: string

  @ApiPropertyOptional()
  profileImageUrl?: string

  @ApiPropertyOptional()
  description?: string

  @ApiPropertyOptional({ enum: ApplicationStatus })
  status?: ApplicationStatus

  @ApiPropertyOptional()
  isRefundable?: boolean

  @ApiPropertyOptional()
  rating?: number
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

export class RatingDto {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number
}
