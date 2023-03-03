import { JobStatus } from '@modela/dtos'

export const NEXT_STATUS_STAGE: Partial<{ [key in JobStatus]: JobStatus }> = {
  [JobStatus.OPEN]: JobStatus.SELECTING,
  [JobStatus.SELECTING]: JobStatus.SELECTION_ENDED,
  [JobStatus.SELECTION_ENDED]: JobStatus.FINISHED,
}
