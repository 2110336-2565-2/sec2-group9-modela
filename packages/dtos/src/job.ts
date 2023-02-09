import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator'
import { Casting, Gender, Job, JobStatus, Shooting } from '@modela/database'

export enum SearchJobStatus {
  'OPEN' = 'OPEN',
  'CLOSE' = 'CLOSE'
}

export class SearchJobDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(20)
  @ApiPropertyOptional({
    default: 20,
  }) //Will set default again in job.service.ts
  limit: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiPropertyOptional({
    default: 1,
  }) //Will set default again in job.service.ts
  page: number

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
  @ApiPropertyOptional()
  age?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiPropertyOptional()
  minWage?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
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
  @ApiProperty()
  shootingLocation: string

  @ApiProperty()
  startDate: Date

  @ApiProperty()
  endDate: Date

  @ApiProperty()
  startTime: Date

  @ApiProperty()
  endTime: Date
}

type EditJobType = Partial<Job> & { shooting: ShootingDto[] }

export class EditJobDto implements EditJobType {

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  title: string

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  description: string

  
  @IsEnum(JobStatus, { each: true })
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  status: JobStatus

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  role: string

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  minAge: number

  @ApiProperty()
  maxAge: number

  @IsEnum(Gender, { each: true })
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  gender: Gender

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  actorCount: number


  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  wage: number


  @IsDateString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  applicationDeadline: Date

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ type: ShootingDto, isArray: true })
  shooting: ShootingDto[]
}

export class CreateJobDto {

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
  minAge: number

  @ApiProperty()
  maxAge: number

  @IsEnum(Gender, { each: true })
  @IsNotEmpty()
  @ApiProperty()
  gender: Gender

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  actorCount: number


  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  wage: number


  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  applicationDeadline: Date

  @IsNotEmpty()
  @ApiProperty({ type: ShootingDto, isArray: true })
  shooting: ShootingDto[]
}

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
}

export class GetJobCardWithMaxPageDto {
  @ApiProperty({ type: GetJobCardDto, isArray: true })
  jobs: GetJobCardDto[]

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
}

export class JobIdDTO {
  @ApiProperty()
  jobId: number
}
