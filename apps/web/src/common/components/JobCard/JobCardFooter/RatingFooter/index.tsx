import React from 'react'

import withJobCardFooter from '../hoc/withJobCardFooter'
import { StyledRating } from './styled'
import { RatingFooterProps } from './types'

const RatingFooter = ({ rating }: RatingFooterProps) => {
  if (!rating) return null

  return (
    <>
      <div style={{ flexGrow: 1 }} />{' '}
      <StyledRating value={rating} precision={0.01} readOnly />
    </>
  )
}

export default withJobCardFooter<RatingFooterProps>(RatingFooter)
