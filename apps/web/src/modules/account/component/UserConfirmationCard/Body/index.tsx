import { Divider } from '@mui/material'

import UserConfirmationCardFooter from '../Footer'
import UserConfirmationCardHeader from '../Header'
import { CardContainer } from './styled'
import { cardProps } from './type'

const UserConfirmationCard = (props: cardProps) => {
  return (
    <CardContainer>
      <UserConfirmationCardHeader />
      <Divider sx={{ margin: '8px 8px 8px 20px' }} />
      <UserConfirmationCardFooter {...props} />
    </CardContainer>
  )
}

export default UserConfirmationCard
