import { Typography } from '@mui/material'
import React from 'react'

import { FooterRow } from './styled'

export default function Footer() {
  const read = () => {
    window.alert('Readed')
  }

  return (
    <FooterRow>
      <Typography
        variant="button"
        color="primary"
        style={{ cursor: 'pointer', justifyContent: 'left' }}
        onClick={() => read()}
      >
        MARK AS READ
      </Typography>
    </FooterRow>
  )
}
