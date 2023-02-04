import { Typography } from '@mui/material'
import React from 'react'

import { JobDetailProps } from './type'

export default function JobDetail(prop: JobDetailProps) {
  const { job } = prop

  return (
    <>
      <Typography variant="subtitle2" sx={{ color: 'rgba(0,0,0,0.6)' }}>
        {job}
      </Typography>
    </>
  )
}
