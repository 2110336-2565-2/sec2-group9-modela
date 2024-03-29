import { Divider, Typography } from '@mui/material'
import TextField from 'common/components/TextField'

import { HeaderContainer } from './styled'
import { UserRejectionModalProps } from './type'
import UserRejectionModalFooter from './UserRejectionModalFooter'

const UserRejectionModal = ({ setReason, reject }: UserRejectionModalProps) => {
  return (
    <>
      <HeaderContainer>
        <Typography variant="h5">เหตุผลในการปฏิเสธ</Typography>
      </HeaderContainer>
      <Divider />
      <TextField
        required
        multiline
        rows={3}
        placeholder="เหตุผล*"
        onChange={(e) => setReason(e.target.value)}
      />
      <UserRejectionModalFooter reject={reject} />
    </>
  )
}

export default UserRejectionModal
