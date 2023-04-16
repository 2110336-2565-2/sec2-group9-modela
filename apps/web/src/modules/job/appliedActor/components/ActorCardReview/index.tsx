import { Button, Typography } from '@mui/material'
import React from 'react'

import useReview from './hooks/useReview'
import { RatingContainer, StyledRating } from './styled'
import { ActorCardReviewProps } from './types'

const ActorCardReview = ({ rating, actorId }: ActorCardReviewProps) => {
  const { handleScoreClick, score, handleSubmit, isSubmitted } = useReview(
    actorId,
    rating,
  )

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
