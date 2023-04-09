import { Button, Typography } from '@mui/material'
import React from 'react'

import useReview from './hooks/useReview'
import { RatingContainer, StyledRating } from './styled'

const ActorCardReview = () => {
  const { handleScoreClick, score, handleSubmit, isSubmitted } = useReview()

  return (
    <RatingContainer>
      <Typography variant="subtitle2" color="#00000099">
        ประเมินนักแสดง
      </Typography>
      <StyledRating
        onClick={(e) => e.stopPropagation()}
        onChange={handleScoreClick}
        value={score}
        readOnly={isSubmitted}
      />
      <div style={{ flexGrow: 1 }} />
      {!isSubmitted && <Button onClick={handleSubmit}>ส่งประเมิน</Button>}
    </RatingContainer>
  )
}

export default ActorCardReview
