import { Divider, Typography } from '@mui/material'

import { CardContainer, HeaderContainer } from './styled'
import { UserConfirmationModalProps } from './type'
import UserConfirmationModalFooter from './UserConfirmationModalFooter'

const UserConfirmationModal = (props: UserConfirmationModalProps) => {
  return (
    <CardContainer>
      <HeaderContainer>
        <Typography variant="h5">ยืนยันการอนุมัติ</Typography>
      </HeaderContainer>
      <Divider sx={{ margin: '20px 8px 8px 8px' }} />
      <UserConfirmationModalFooter {...props} />
    </CardContainer>
  )
}

export default UserConfirmationModal
