import { Box, Button } from '@mui/material'
import React from 'react'

import { SubmitButtonProps } from './types'

const SubmitButton = ({ edit }: SubmitButtonProps) => {
  return (
    <Box display="flex" justifyContent="center">
      <Button
        sx={{ borderRadius: '12px' }}
        size="large"
        variant="contained"
        type="submit"
      >
        {edit ? 'แก้ไขงาน' : 'สร้างงาน'}
      </Button>
    </Box>
  )
}

export default SubmitButton
