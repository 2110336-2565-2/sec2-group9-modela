import { Modal, styled } from '@mui/material'

export const RootModalContainer = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
`
export const ModalContentContainer = styled('div')`
  width: 100%;
  max-width: 500px;
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  display: flex;
  gap: 12px;
  flex-direction: column;
`
