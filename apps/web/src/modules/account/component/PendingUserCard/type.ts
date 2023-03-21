import { PendingUserDto } from '@modela/dtos'

export interface PendingUserCardProps {
  data: PendingUserDto
  acceptUser(): void
  rejectUser(): void
  setModalId(userId: number): void
  setModalReason(rejectedReason: string): void
}
