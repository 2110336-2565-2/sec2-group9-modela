export interface PendingUserCardFooterProps {
  userId: number
  acceptUser(): void
  rejectUser(): void
  setModalId(userId: number): void
  setModalReason(rejectedReason: string): void
}
