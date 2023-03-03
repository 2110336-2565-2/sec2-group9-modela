import { JobStatus } from '@modela/dtos'

export interface IChangeStatusModalProps {
  isOpen: boolean
  status: JobStatus
  handleClose(): void
  handleSubmit(): Promise<void>
}
