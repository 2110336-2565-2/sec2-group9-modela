import { GetJobCardDto } from '@modela/dtos'

import { WithJobCardFooterProps } from './JobCardFooter/hoc/withJobCardFooter/types'
import { WithJobCardHeaderProps } from './JobCardHeader/hoc/withJobCardHeader/types'
import { ReportHeaderProps } from './JobCardHeader/ReportHeader/types'

export interface JobCardContentProps
  extends Pick<GetJobCardDto, 'description' | 'jobId' | 'status'> {
  isReported?: boolean
}

export type BaseJobCardProps = WithJobCardFooterProps &
  WithJobCardHeaderProps &
  JobCardContentProps

export type ReportableJobCardProps = BaseJobCardProps &
  ReportHeaderProps & { type: 'report' }

export type BasedJobCardProps = BaseJobCardProps & { type: 'base' }

export type JobCardProps = ReportableJobCardProps | BasedJobCardProps

export type JobCardType = JobCardProps['type']
