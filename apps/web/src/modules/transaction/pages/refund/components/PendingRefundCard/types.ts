import { PendingRefundDto } from '@modela/dtos'

export interface PendingRefundCardProps extends PendingRefundDto {
  handleClickReject(jobId: number, actorId: number): void
  handleClickFinish(jobId: number, actorId: number): void
}
