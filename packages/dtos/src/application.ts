import { ApplicationStatus } from '@modela/database'
import { ApiProperty } from '@nestjs/swagger'

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
