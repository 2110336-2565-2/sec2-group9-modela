import { Typography } from '@mui/material'
import React from 'react'

import { InfoProps } from './types'

export default function InfoText(props: InfoProps) {
  const { main, info } = props
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Typography variant="subtitle2">
        {main + ':'}
        <Typography
          component="span"
          variant="subtitle2"
          sx={{
            color: 'rgba(0,0,0,0.6)',
            wordBreak: 'break-word',
            marginLeft: '5px',
          }}
        >
          {`${info}`}
        </Typography>
      </Typography>
    </div>
  )
}
