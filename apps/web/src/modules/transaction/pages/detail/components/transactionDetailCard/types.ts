import { PendingActorDebitDto } from '@modela/dtos'

export interface transactionDetailCardProps {
  data: PendingActorDebitDto
  markAccepted: (actorId: number) => void
}
