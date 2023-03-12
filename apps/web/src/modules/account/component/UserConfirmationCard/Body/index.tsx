import { Divider } from '@mui/material'

import UserConfirmationCardFooter from '../Footer'
import UserConfirmationCardHeader from '../Header'
import { CardContainer } from './styled'

const UserConfirmationCard = () => {
  return (
    <CardContainer>
      <UserConfirmationCardHeader />
      <Divider sx={{ margin: '8px 8px 8px 20px' }} />
      <UserConfirmationCardFooter />
    </CardContainer>
  )
}

export default UserConfirmationCard
