import { Button, Typography } from '@mui/material'
import React from 'react'

import { RatingContainer, StyledRating } from './styled'

const ActorCardReview = () => {
  return (
    <RatingContainer>
      <Typography variant="subtitle2" color="#00000099">
        ประเมินนักแสดง
      </Typography>
      <StyledRating />
      <div style={{ flexGrow: 1 }} />
      <Button>ส่งประเมิน</Button>
    </RatingContainer>
  )
}

export default ActorCardReview
