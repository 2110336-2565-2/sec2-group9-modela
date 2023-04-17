export interface RejectOfferModalProps {
  isOpen: boolean
  title: string
  handleClose(): void
  handleSubmit(): Promise<void>
}
