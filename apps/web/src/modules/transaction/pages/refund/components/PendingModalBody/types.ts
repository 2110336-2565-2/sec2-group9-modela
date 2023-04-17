export interface ConfirmPendingModalProps {
  modalType: 'reject' | 'accept'
  handleCancel: () => void
  handleConfirm: () => void
}
