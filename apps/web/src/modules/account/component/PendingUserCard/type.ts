import { PendingUserDto } from '@modela/dtos'

export interface PendingUserCardProps {
  data: PendingUserDto
  accept(): void
  reject(): void
  setId(userId: number): void
  setReason(rejectedReason: string): void
}
