import { Divider, Typography } from '@mui/material'

import { HeaderContainer } from './styled'
import { UserConfirmationModalProps } from './type'
import UserConfirmationModalFooter from './UserConfirmationModalFooter'

const UserConfirmationModal = (props: UserConfirmationModalProps) => {
  return (
    <>
      <HeaderContainer>
        <Typography variant="h5">ยืนยันการอนุมัติ</Typography>
      </HeaderContainer>
      <Divider />
      <UserConfirmationModalFooter {...props} />
    </>
  )
}

export default UserConfirmationModal
