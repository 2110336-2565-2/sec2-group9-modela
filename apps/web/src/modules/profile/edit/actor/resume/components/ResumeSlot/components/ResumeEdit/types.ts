import { ResumeDto } from '@modela/dtos'

export interface IResumeEditProps extends ResumeDto {
  name: string
  resumeUrl: string
  changeToView(): void
  handleCancel(): void
  handleSubmit(name: string, resumeId: number, file?: File): Promise<void>
}
