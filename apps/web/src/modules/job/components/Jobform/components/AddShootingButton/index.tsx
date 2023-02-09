import { Add } from '@mui/icons-material'
import { Typography } from '@mui/material'
import React from 'react'

import { AddShootingButtonProps } from './type'

const AddShootingButton = (prop: AddShootingButtonProps) => {
  return (
    <div style={{ display: 'flex', cursor: 'pointer', marginLeft: '20px' }}>
      <Add color="primary" />
      <Typography onClick={prop.onClick} color="primary">
        เพิ่มการถ่ายทำ
      </Typography>
    </div>
  )
}

export default AddShootingButton
