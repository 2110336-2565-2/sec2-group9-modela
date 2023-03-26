import { ActorDto, JobStatus } from '@modela/dtos'

export interface ActorCardHeaderProps
  extends Omit<ActorDto, 'resumeUrl' | 'applicationId'> {
  jobStatus?: JobStatus
}
