import { Button, Typography } from '@mui/material'

import { CardContainer, FooterContainer, HeaderContainer } from './styled'
import { ConfirmationModalProps } from './type'

const ConfirmationModal = (props: ConfirmationModalProps) => {
  const { close, confirm } = props

  return (
    <CardContainer>
      <HeaderContainer>
        <Typography variant="h5">ทำเครื่องหมายว่าโอนเสร็จสิ้น</Typography>
      </HeaderContainer>

      <FooterContainer>
        <Button
          sx={{ backgroundColor: '#AA5B5B', borderRadius: 2 }}
          variant="contained"
          onClick={close}
        >
          <Typography variant="button">ยกเลิก</Typography>
        </Button>
        <Button
          sx={{ backgroundColor: '#66A373', borderRadius: 2 }}
          variant="contained"
          onClick={confirm}
        >
          <Typography variant="button">ยืนยัน</Typography>
        </Button>
      </FooterContainer>
    </CardContainer>
  )
}

export default ConfirmationModal
