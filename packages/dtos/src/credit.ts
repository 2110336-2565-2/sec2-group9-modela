import { ApiProperty } from '@nestjs/swagger'

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
}
