import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsDate,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator'
import { Gender, Job, JobStatus, Shooting } from '@modela/database'

export enum SearchJobStatus {
  'OPEN' = 'OPEN',
  'CLOSE' = 'CLOSE',
  'CANCELLED' = 'CANCELLED',
  'REPORTED' = 'REPORTED',
}
const maxInt32 = 2147483647 //max int32
export class SearchJobDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(20)
  @ApiPropertyOptional({
    default: 20,
  }) //Only for test in swagger, will set default again in job.service.ts
  limit: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiPropertyOptional({
    default: 1,
  }) //Only for test in swagger, Will set default again in job.service.ts
  page: number

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  title?: string

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiPropertyOptional()
  startDate?: Date

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiPropertyOptional()
  startTime?: Date

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiPropertyOptional()
  endDate?: Date

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiPropertyOptional()
  endTime?: Date

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  location?: string

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(maxInt32)
  @ApiPropertyOptional()
  age?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(maxInt32)
  @ApiPropertyOptional()
  minWage?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(maxInt32)
  @ApiPropertyOptional()
  maxWage?: number

  @IsOptional()
  @IsEnum(SearchJobStatus, { each: true })
  @ApiPropertyOptional({ enum: SearchJobStatus, isArray: true })
  status?: SearchJobStatus[]

  @IsOptional()
  @IsEnum(Gender, { each: true })
  @ApiPropertyOptional({ enum: Gender, isArray: true })
  gender?: Gender[]

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  castingId?: number
}

export class ShootingDto implements Partial<Shooting> {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  shootingLocation: string

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  startDate: Date

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  endDate: Date

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  startTime: Date

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  endTime: Date
}

type EditJobType = Partial<Job> & { shooting: ShootingDto[] }

export class CreateJobDto implements EditJobType {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  role: string

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @Min(1)
  @IsInt()
  minAge: number

  @ApiProperty()
  @Min(1)
  @IsInt()
  maxAge: number

  @IsEnum(Gender, { each: true })
  @IsNotEmpty()
  @ApiProperty()
  gender: Gender

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @Min(1)
  @IsInt()
  actorCount: number

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @Min(1)
  wage: number

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  applicationDeadline: Date

  @IsNotEmpty()
  @ApiProperty({ type: ShootingDto, isArray: true })
  shooting: ShootingDto[]
}

export class EditJobDto extends CreateJobDto {}

export class GetJobCardDto extends OmitType(EditJobDto, [
  'role',
  'minAge',
  'maxAge',
  'shooting',
]) {
  @ApiProperty()
  jobId: number

  @ApiProperty()
  companyName: string

  @ApiProperty()
  jobCastingImageUrl: string

  @ApiProperty()
  castingId: number

  @ApiProperty()
  castingName: string

  @ApiProperty()
  status: JobStatus
}

export class GetJobCardByAdminDto extends GetJobCardDto {
  @ApiProperty()
  isReported: Boolean
}

export class GetJobCardWithMaxPageDto {
  @ApiProperty({ type: GetJobCardDto, isArray: true })
  jobs: GetJobCardDto[]

  @ApiProperty()
  maxPage: number
}

export class GetJobCardByAdminWithMaxPageDto {
  @ApiProperty({ type: GetJobCardByAdminDto, isArray: true })
  jobs: GetJobCardByAdminDto[]

  @ApiProperty()
  maxPage: number
}

export class GetJobDto extends EditJobDto {
  @ApiProperty()
  jobId: number

  @ApiProperty()
  companyName: string

  @ApiProperty()
  jobCastingImageUrl: string

  @ApiProperty()
  status: JobStatus

  @ApiProperty()
  castingId: number

  @ApiProperty()
  castingName: string
}

export class JobIdDto {
  @ApiProperty()
  jobId: number
}

export class JobSummaryDto {
  @ApiProperty()
  status: JobStatus

  @ApiProperty()
  pendingActorCount: number
}
