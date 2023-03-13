import { Divider } from '@mui/material'
import TextField from 'common/components/TextField'

import { CardContainer } from './styled'
import { UserRejectionCardProps } from './type'
import UserRejectionCardFooter from './UserRejectionModalFooter'
import UserRejectionCardHeader from './UserRejectionModalHeader'

const UserRejectionCard = ({ setReason, reject }: UserRejectionCardProps) => {
  return (
    <CardContainer>
      <UserRejectionCardHeader />
      <Divider sx={{ margin: '20px 8px 12px 8px' }} />
      <TextField
        required
        multiline
        rows={3}
        placeholder="เหตุผล*"
        onChange={(e) => setReason(e.target.value)}
      />
      <UserRejectionCardFooter reject={reject} />
    </CardContainer>
  )
}

export default UserRejectionCard
