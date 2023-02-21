import { Button } from '@mui/material'
import React from 'react'

import { ActionContainer } from './styled'

const ActorCardAction = () => {
  return (
    <ActionContainer>
      <Button color="error">ปฏิเสธ</Button>
      <Button color="success">ส่งข้อเสนอ</Button>
    </ActionContainer>
  )
}

export default ActorCardAction
