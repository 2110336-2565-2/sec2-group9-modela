export interface PendingUserCardFooterProps {
  userId: number
  accept(): void
  reject(): void
  setId(userId: number): void
  setReason(rejectedReason: string): void
}
