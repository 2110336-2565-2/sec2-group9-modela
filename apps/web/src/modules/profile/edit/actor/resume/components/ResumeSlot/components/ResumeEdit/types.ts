import { ResumeDto } from '@modela/dtos'

export interface IResumeEditProps extends ResumeDto {
  name: string
  resumeUrl: string
  handleCancel?(resumeId: number): void
  handleSubmit?(): void
}
