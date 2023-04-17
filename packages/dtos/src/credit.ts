import { ApiProperty } from '@nestjs/swagger'
import { IsUrl } from 'class-validator'

export class GetPendingTransactionDto {
  @ApiProperty()
  castingId: number

  @ApiProperty()
  firstName: string

  @ApiProperty()
  middleName?: string

  @ApiProperty()
  lastName: string

  @ApiProperty()
  companyName: string

  @ApiProperty()
  title: string

  @ApiProperty()
  jobId: number

  @ApiProperty()
  amount: number

  @ApiProperty()
  bankName: string

  @ApiProperty()
  bankAccount: string

  @ApiProperty()
  proofUrl: string

  @ApiProperty()
  profileImageUrl: string
}

export class GetTransactionDetailDto {
  @ApiProperty()
  title: string

  @ApiProperty()
  jobId: number

  @ApiProperty()
  amount: number

  @ApiProperty()
  bankName: string

  @ApiProperty()
  bankAccount: string
}

export class SendProofOfTransactionDto {
  @ApiProperty()
  @IsUrl()
  proofUrl: string
}
