import { Typography } from '@mui/material'
import React from 'react'

import { InfoProps } from './types'

export default function JobCard(props: InfoProps) {
  const { main, info, isBlack } = props
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Typography variant="subtitle2">
        {main + ':'}
        <Typography
          component="span"
          variant="subtitle2"
          sx={{
            color: isBlack ? '' : 'rgba(0,0,0,0.6)',
            wordBreak: 'break-word',
          }}
        >
          &nbsp;{`  ${info}`}
        </Typography>
      </Typography>
    </div>
  )
}
