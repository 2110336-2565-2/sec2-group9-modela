import { JobStatus } from '@modela/dtos'

export interface JobMenuProps {
  focus?: 'detail' | 'actor'
  setStatus?: (status: JobStatus) => void
}
