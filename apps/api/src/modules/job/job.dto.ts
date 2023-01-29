import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger'
import { Casting, Gender, Job, JobStatus, Shooting } from '@prisma/client'

export enum SearchJobStatus {
  'OPEN',
  'CLOSE',
}

export class SearchJobDTO {
  @ApiPropertyOptional()
  limit?: number

  @ApiPropertyOptional()
  page?: number

  @ApiPropertyOptional()
  startDate?: Date

  @ApiPropertyOptional()
  startTime?: Date

  @ApiPropertyOptional()
  endDate?: Date

  @ApiPropertyOptional()
  endTime?: Date

  @ApiPropertyOptional()
  age?: number

  @ApiPropertyOptional()
  minWage?: number

  @ApiPropertyOptional()
  maxWage?: number

  @ApiPropertyOptional({ enum: SearchJobStatus, isArray: true })
  status?: SearchJobStatus[]

  @ApiPropertyOptional({ enum: Gender, isArray: true })
  gender?: Gender[]

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
