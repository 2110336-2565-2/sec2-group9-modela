import { ApplicationStatus } from '@modela/database'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'

export class ActorDto {
  @ApiProperty()
  actorId: number

  @ApiProperty()
  firstName: string

  @ApiProperty()
  middleName: string

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
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string

  @ApiProperty({ type: ApplicationStatus, isArray: true })
  @IsOptional()
  @IsEnum(ApplicationStatus, { each: true })
  status: ApplicationStatus[]
}
