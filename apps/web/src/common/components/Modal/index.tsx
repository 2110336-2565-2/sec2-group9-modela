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
    <RootContainer
      disableEnforceFocus
      sx={rootSx}
      className={rootClassName}
      {...modalProps}
    >
      <ContentContainer sx={contentSx} className={contentClassName}>
        {children}
      </ContentContainer>
    </RootContainer>
  )
}

export default Modal
