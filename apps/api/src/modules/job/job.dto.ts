import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger'
import { Casting, Gender, Job, JobStatus, Shooting } from '@prisma/client'
import {
  IsDateString,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator'

export enum SearchJobStatus {
  'OPEN',
  'CLOSE',
}

export class SearchJobDTO {
  @IsOptional()
  @IsNumberString()
  @ApiPropertyOptional()
  limit?: number

  @IsOptional()
  @IsNumberString()
  @ApiPropertyOptional()
  page?: number

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

export class ShootingDTO implements Partial<Shooting> {
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

type EditJobType = Partial<Job> & { shooting: ShootingDTO[] }

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

  @ApiProperty({ type: ShootingDTO, isArray: true })
  shooting: ShootingDTO[]
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
