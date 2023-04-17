import { GetJobCardDto } from '@modela/dtos'

export interface JobCardContainerProps {
  jobs: GetJobCardDto[]
  maxPage: number
  isHistory?: boolean
}
