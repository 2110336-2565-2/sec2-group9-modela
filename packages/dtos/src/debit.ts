import { ApiProperty } from '@nestjs/swagger'

export class GetPendingJobsDebitsDto {
  @ApiProperty()
  jobId: number

  @ApiProperty()
  title: string

  @ApiProperty()
  companyName: string
}
