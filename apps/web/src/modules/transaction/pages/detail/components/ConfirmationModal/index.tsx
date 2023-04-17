import { Button, Typography } from '@mui/material'

import { CardContainer, FooterContainer, HeaderContainer } from './styled'
import { ConfirmationModalProps } from './type'

const ConfirmationModal = (props: ConfirmationModalProps) => {
  const { close, confirm } = props

  return (
    <CardContainer>
      <HeaderContainer>
        <Typography variant="h5" textAlign="center">
          ทำเครื่องหมายว่าโอนเสร็จสิ้น
        </Typography>
      </HeaderContainer>

      <FooterContainer>
        <Button
          sx={{ borderRadius: 2 }}
          variant="contained"
          color="reject"
          onClick={close}
        >
          <Typography variant="button">ยกเลิก</Typography>
        </Button>
        <Button
          sx={{ borderRadius: 2 }}
          variant="contained"
          color="success"
          onClick={confirm}
        >
          <Typography variant="button">ยืนยัน</Typography>
        </Button>
      </FooterContainer>
    </CardContainer>
  )
}

export default ConfirmationModal
