import { ActorDto, JobStatus } from '@modela/dtos'

export interface ActorCardProps extends ActorDto {
  jobStatus: JobStatus
}
