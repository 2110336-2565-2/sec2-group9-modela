import { IResumeWithFirstFlag } from '../../hooks/types'

export interface IResumeSlotProps extends IResumeWithFirstFlag {
  handleDelete(resumeId: number): void
  handleCancel(resumeId: number): void
}
