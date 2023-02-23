import { ResumeDto } from '@modela/dtos'

export interface IResumeWithFirstFlag extends ResumeDto {
  isFirst?: boolean
}

export interface IResumeContextValue {
  resume: IResumeWithFirstFlag[]
  handleAddNewResume(): void
  handleCancelUpdate(idx: number, isFirst: boolean): void
  handleDeleteResume(idx: number): void
  handleUpdateResume(
    idx: number,
    name: string,
    isFirst: boolean,
    file?: File,
  ): void
  handleOpenDeleteModal(resumeId: number): void
  handleCloseDeleteModal(): void
}
