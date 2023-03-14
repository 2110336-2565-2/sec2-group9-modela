import { Divider } from '@mui/material'
import TextField from 'common/components/TextField'

import { CardContainer } from './styled'
import { UserRejectionModalProps } from './type'
import UserRejectionModalFooter from './UserRejectionModalFooter'
import UserRejectionModalHeader from './UserRejectionModalHeader'

const UserRejectionModal = ({ setReason, reject }: UserRejectionModalProps) => {
  return (
    <CardContainer>
      <UserRejectionModalHeader />
      <Divider sx={{ margin: '20px 8px 12px 8px' }} />
      <TextField
        required
        multiline
        rows={3}
        placeholder="เหตุผล*"
        onChange={(e) => setReason(e.target.value)}
      />
      <UserRejectionModalFooter reject={reject} />
    </CardContainer>
  )
}

export default UserRejectionModal
