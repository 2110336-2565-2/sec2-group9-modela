import { Typography } from '@mui/material'
import React from 'react'

import { BASE_COLOR, TEXT_COLOR } from './constants'
import { ChipContainer } from './styled'
import { ChipProps } from './types'

const Chip = ({ label, variant, outlined }: ChipProps) => {
  return (
    <ChipContainer
      sx={{
        backgroundColor: BASE_COLOR[variant],
        border: outlined ? `1px solid ${TEXT_COLOR[variant]}` : '',
      }}
    >
      <Typography variant="subtitle2" sx={{ color: TEXT_COLOR[variant] }}>
        {label}
      </Typography>
    </ChipContainer>
  )
}

export default Chip
