import { Divider } from '@mui/material'

import { CardContainer } from './styled'
import { UserConfirmationModalProps } from './type'
import UserConfirmationModalFooter from './UserConfirmationModalFooter'
import UserConfirmationModalHeader from './UserConfirmationModalHeader'

const UserConfirmationModal = (props: UserConfirmationModalProps) => {
  return (
    <CardContainer>
      <UserConfirmationModalHeader />
      <Divider sx={{ margin: '20px 8px 8px 8px' }} />
      <UserConfirmationModalFooter {...props} />
    </CardContainer>
  )
}

export default UserConfirmationModal
