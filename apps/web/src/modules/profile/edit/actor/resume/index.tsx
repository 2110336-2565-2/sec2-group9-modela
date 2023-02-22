import { Add } from '@mui/icons-material'
import { Divider, Typography } from '@mui/material'
import React from 'react'

import ResumeSlot from './components/ResumeSlot'
import { AddResumeButton, CardContainer } from './styled'

const ActorResume = () => {
  return (
    <CardContainer>
      <Typography variant="h5">เรซูเม่</Typography>
      <Divider sx={{ width: '100%' }} />
      <ResumeSlot />
      <AddResumeButton variant="text">
        <Add />
        เพิ่มเรซูเม่
      </AddResumeButton>
    </CardContainer>
  )
}

export default ActorResume
