import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger'
import { Casting, Gender, Job, JobStatus, Shooting } from '@prisma/client'
import { Type } from 'class-transformer'
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator'

export enum SearchJobStatus {
  'OPEN',
  'CLOSE',
}

export class SearchJobDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(20)
  @Type(() => Number)
  @ApiProperty({ required: true })
  limit: number

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @ApiProperty({ required: true })
  page: number

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional()
  startDate?: Date

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional()
  startTime?: Date

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional()
  endDate?: Date

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional()
  endTime?: Date

  @IsOptional()
  @IsNumberString()
  @ApiPropertyOptional()
  age?: number

  @IsOptional()
  @IsNumberString()
  @ApiPropertyOptional()
  minWage?: number

  @IsOptional()
  @IsNumberString()
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

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  castingId?: string
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
  @ApiProperty()
  title: string

  @ApiProperty()
  description: string

  @ApiProperty()
  status: JobStatus

  @ApiProperty()
  role: string

  @ApiProperty()
  minAge: number

  @ApiProperty()
  maxAge: number

  @ApiProperty()
  gender: Gender

  @ApiProperty()
  actorCount: number

  @ApiProperty()
  wage: number

  @ApiProperty()
  applicationDeadline: Date

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
}

export class JobIdDTO {
  @ApiProperty()
  jobId: number
}
