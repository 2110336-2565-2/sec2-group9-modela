import { Modal as MUIModal } from '@mui/material'

import { ContentContainer, RootContainer } from './styled'
import { ModalProps } from './types'

const Modal = (props: ModalProps) => {
  const {
    children,
    contentSx,
    rootSx,
    rootClassName,
    contentClassName,
    ...modalProps
  } = props
  return (
    <MUIModal {...modalProps}>
      <RootContainer sx={rootSx} className={rootClassName}>
        <ContentContainer sx={contentSx} className={contentClassName}>
          {children}
        </ContentContainer>
      </RootContainer>
    </MUIModal>
  )
}

export default Modal
