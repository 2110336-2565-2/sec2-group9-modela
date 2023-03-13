import { Divider } from '@mui/material'

import { CardContainer } from './styled'
import { UserConfirmationCardProps } from './type'
import UserConfirmationCardFooter from './UserConfirmationModalFooter'
import UserConfirmationCardHeader from './UserConfirmationModalHeader'

const UserConfirmationCard = (props: UserConfirmationCardProps) => {
  return (
    <CardContainer>
      <UserConfirmationCardHeader />
      <Divider sx={{ margin: '20px 8px 8px 8px' }} />
      <UserConfirmationCardFooter {...props} />
    </CardContainer>
  )
}

export default UserConfirmationCard
