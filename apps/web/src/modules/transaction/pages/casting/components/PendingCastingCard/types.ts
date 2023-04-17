import { GetPendingTransactionDto } from '@modela/dtos'

export interface PendingCastingCardProps extends GetPendingTransactionDto {
  handleClickReject(jobId: number, castingId: number): void
  handleClickFinish(jobId: number, castingId: number): void
}
