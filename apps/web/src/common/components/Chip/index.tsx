import { Typography } from '@mui/material'
import React from 'react'

import { ChipContainer } from './styled'
import { ChipProps } from './types'
import { getBaseColor, getTextColor } from './utils/getColor'

const Chip = ({ label, variant }: ChipProps) => {
  return (
    <ChipContainer sx={{ backgroundColor: getBaseColor(variant) }}>
      <Typography variant="subtitle2" sx={{ color: getTextColor(variant) }}>
        {label}
      </Typography>
    </ChipContainer>
  )
}

export default Chip
