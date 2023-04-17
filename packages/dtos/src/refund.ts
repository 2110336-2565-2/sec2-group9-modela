import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUrl } from 'class-validator'

export class PendingRefundCastingDto {
  @ApiProperty()
  firstName: string

  @ApiProperty()
  middleName: string

  @ApiProperty()
  lastName: string

  @ApiProperty()
  castingId: number

  @ApiProperty()
  profileImageUrl: string

  @ApiProperty()
  companyName: string

  @ApiProperty()
  bankName: string

  @ApiProperty()
  bankAccount: string
}

export class PendingRefundActorDto {
  @ApiProperty()
  firstName: string

  @ApiProperty()
  middleName: string

  @ApiProperty()
  lastName: string

  @ApiProperty()
  actorId: number
}

export class PendingRefundDto {
  @ApiProperty({ type: PendingRefundCastingDto })
  casting: PendingRefundCastingDto

  @ApiProperty()
  jobId: number

  @ApiProperty()
  title: string

  @ApiProperty({ type: PendingRefundActorDto })
  actor: PendingRefundActorDto

  @ApiProperty()
  wage: number

  @ApiProperty()
  reason: string

  @ApiProperty()
  proofUrl: string
}

export class SendRefundDto {
  @ApiProperty()
  @IsString()
  reason: string

  @ApiProperty()
  @IsUrl()
  proofUrl: string
}

export class RequestRefundInfoUserDto {
  @ApiProperty()
  userId: number

  @ApiProperty()
  firstName: string

  @ApiProperty()
  middleName: string

  @ApiProperty()
  lastName: string
}

export class RequestRefundInfoDto {
  @ApiProperty()
  jobId: number

  @ApiProperty()
  title: string

  @ApiProperty({ type: RequestRefundInfoUserDto })
  user: RequestRefundInfoUserDto
}
