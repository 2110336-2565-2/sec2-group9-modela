export interface IDeleteModalProps {
  isOpen: boolean
  name: string
  handleClose(): void
  handleSubmit(): Promise<void>
}
