import { GetJobCardDto } from '@modela/dtos'

import { OfferActionProps } from './JobCardAction/OfferAction/types'
import { ApplyFooterProps } from './JobCardFooter/ApplyFooter/types'
import { CancelApplyFooterProps } from './JobCardFooter/CancelApplyFooter/types'
import { WithJobCardFooterProps } from './JobCardFooter/hoc/withJobCardFooter/types'
import { RatingFooterProps } from './JobCardFooter/RatingFooter/types'
import { UnpaidFooterProps } from './JobCardFooter/UnpaidFooter/types'
import { ApplicationStatusHeaderProps } from './JobCardHeader/ApplicationStatusHeader/types'
import { EditHeaderProps } from './JobCardHeader/EditHeader/types'
import { WithJobCardHeaderProps } from './JobCardHeader/hoc/withJobCardHeader/types'
import { ReportHeaderProps } from './JobCardHeader/ReportHeader/types'

export interface JobCardContentProps
  extends Pick<GetJobCardDto, 'description' | 'jobId' | 'status'> {
  isReported?: boolean
}

export type BaseJobCardProps = WithJobCardFooterProps &
  WithJobCardHeaderProps &
  JobCardContentProps

export type ReportWithApplyJobCardProps = BaseJobCardProps &
  ReportHeaderProps &
  ApplyFooterProps & { type: 'reportWithApply' }

export type EditableJobCardProps = BaseJobCardProps &
  EditHeaderProps & { type: 'edit' }

export type ReportedJobCardProps = BaseJobCardProps &
  EditHeaderProps & { type: 'reported' }

export type AppliedJobCardProps = BaseJobCardProps &
  ApplicationStatusHeaderProps &
  CancelApplyFooterProps &
  OfferActionProps & { type: 'applied' }

export type UnpaidJobCardProps = BaseJobCardProps &
  UnpaidFooterProps & { type: 'unpaid' }

export type HistoryJobCardProps = BaseJobCardProps &
  RatingFooterProps & { type: 'history' }

export type BasedJobCardProps = BaseJobCardProps & { type: 'base' }

export type JobCardProps =
  | ReportWithApplyJobCardProps
  | BasedJobCardProps
  | EditableJobCardProps
  | ReportedJobCardProps
  | AppliedJobCardProps
  | UnpaidJobCardProps
  | HistoryJobCardProps

export type JobCardType = JobCardProps['type']
