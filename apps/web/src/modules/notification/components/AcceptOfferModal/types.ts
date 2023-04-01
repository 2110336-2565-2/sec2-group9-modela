export interface AcceptOfferModalProps {
  isOpen: boolean
  title: string
  handleClose(): void
  handleSubmit(): Promise<void>
}
