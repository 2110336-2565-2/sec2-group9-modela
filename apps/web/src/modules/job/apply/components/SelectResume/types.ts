import { ResumeDto } from '@modela/dtos'

export interface ApplyProps {
  resumes: ResumeDto[]
  setId: (Id: number) => void
  Id: number | undefined
}
