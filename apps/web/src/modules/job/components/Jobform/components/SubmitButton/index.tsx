import { Box, Button } from '@mui/material'
import React from 'react'
const SubmitButton = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Button
        sx={{ borderRadius: '12px' }}
        size="large"
        variant="contained"
        type="submit"
      >
        สร้างงาน
      </Button>
    </Box>
  )
}

export default SubmitButton
