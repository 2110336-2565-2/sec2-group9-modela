import { ApiProperty } from '@nestjs/swagger'

export class GetPendingJobsDebitsDto {
  @ApiProperty()
  jobId: number

  @ApiProperty()
  title: string

  @ApiProperty()
  companyName: string

  @ApiProperty()
  firstname: string

  @ApiProperty()
  castingId: number

  @ApiProperty()
  profileImageUrl: string
}

export class PendingActorDebitDto {
  @ApiProperty()
  actorId: number

  @ApiProperty()
  firstName: string

  @ApiProperty()
  middleName: string

  @ApiProperty()
  lastName: string

  @ApiProperty()
  profileImageUrl: string

  @ApiProperty()
  bankName: string

  @ApiProperty()
  bankAccount: string
}

export class GetPendingActorDebitsByJobDto {
  @ApiProperty()
  jobId: number

  @ApiProperty()
  title: string

  @ApiProperty({ type: PendingActorDebitDto, isArray: true })
  actorList: PendingActorDebitDto[]
}
