import { Divider } from '@mui/material'
import TextField from 'common/components/TextField'

import UserRejectionCardFooter from '../Footer'
import UserRejectionCardHeader from '../Header'
import { CardContainer } from './styled'

const UserRejectionCard = () => {
  return (
    <CardContainer>
      <UserRejectionCardHeader />
      <Divider sx={{ margin: '8px 8px 8px 20px' }} />
      <TextField required multiline placeholder="เหตุผล*" />
      <UserRejectionCardFooter />
    </CardContainer>
  )
}

export default UserRejectionCard
