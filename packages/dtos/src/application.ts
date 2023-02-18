import { Actor, Resume, User } from '@modela/database'
import { ApiProperty } from '@nestjs/swagger'

export class ActorDto implements Partial<Actor & User & Resume> {
  @ApiProperty()
  actorId: number

  @ApiProperty()
  firstName: string

  @ApiProperty()
  middleName: string

  @ApiProperty()
  lastName: string

  @ApiProperty()
  resumeId: number
}

export class GetAppliedActorDto {
  @ApiProperty()
  actors: ActorDto[]
}
