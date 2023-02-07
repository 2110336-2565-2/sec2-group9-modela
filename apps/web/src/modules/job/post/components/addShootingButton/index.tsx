import { Add } from '@mui/icons-material'
import { Typography } from '@mui/material'
import React from 'react'

const AddShootingButton = (prop: { handleAppend: () => void }) => {
  return (
    <div style={{ display: 'flex', cursor: 'pointer', marginLeft: '20px' }}>
      <Add color="primary" />
      <Typography onClick={prop.handleAppend} color="primary">
        เพิ่มการถ่ายทำ
      </Typography>
    </div>
  )
}

export default AddShootingButton
