export interface ConfirmModalBodyProps {
  modalType: 'reject' | 'accept'
  handleCancel: () => void
  handleConfirm: () => void
}
