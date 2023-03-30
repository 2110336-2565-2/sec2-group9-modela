import { GetJobCardDto } from '@modela/dtos'

export interface JobCardProps extends GetJobCardDto {
  isReported?: Boolean
  isHistory?: boolean
}
