import { ResumeDto } from '@modela/dtos'

export interface ApplyProps {
  resumes: ResumeDto[]
  setId: (id: number) => void
  id: number | undefined
}
