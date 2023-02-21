import { ApiProperty, OmitType } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsString } from 'class-validator'

export class ReportDto{

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  reportId: number

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  reporterId: number  


  @ApiProperty()
  @IsString()
  reason: string

}

export class PostReportDto extends OmitType(ReportDto, ['reportId', 'reporterId']) {}

export class GetReportDto extends ReportDto {}

export class GetReportsDto{
  @ApiProperty({ type: GetReportDto, isArray: true })
  reports: GetReportDto[]

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  jobId: number
}
