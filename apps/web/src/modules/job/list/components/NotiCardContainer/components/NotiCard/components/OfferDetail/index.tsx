import { Typography } from '@mui/material'
import React from 'react'

import { OfferDetailProps } from './types'

export default function OfferDetail(prop: OfferDetailProps) {
  const { offer } = prop

  return (
    <>
      <Typography variant="subtitle2" sx={{ color: 'rgba(0,0,0,0.6)' }}>
        {offer}
      </Typography>
    </>
  )
}
