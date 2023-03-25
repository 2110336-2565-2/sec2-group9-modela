export interface IOfferModalProps {
  isOpen: boolean
  title: string
  handleClose(): void
  handleSubmit(): Promise<void>
}
