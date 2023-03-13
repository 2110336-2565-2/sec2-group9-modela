import { Divider } from '@mui/material'
import TextField from 'common/components/TextField'

import UserRejectionCardFooter from '../Footer'
import UserRejectionCardHeader from '../Header'
import { CardContainer } from './styled'
import { cardProps } from './type'

const UserRejectionCard = (props: cardProps) => {
  return (
    <CardContainer>
      <UserRejectionCardHeader />
      <Divider sx={{ margin: '8px 8px 8px 20px' }} />
      <TextField
        required
        multiline
        placeholder="เหตุผล*"
        onChange={(e) => props.setReason(e.target.value)}
      />
      <UserRejectionCardFooter reject={props.modal} />
    </CardContainer>
  )
}

export default UserRejectionCard
