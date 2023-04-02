import { Add } from '@mui/icons-material'
import { Typography } from '@mui/material'
import React from 'react'

import { AddShootingButtonProps } from './type'

const AddShootingButton = (props: AddShootingButtonProps) => {
  return (
    <div style={{ display: 'flex', cursor: 'pointer', marginLeft: '20px' }}>
      <Add color="primary" />
      <Typography onClick={props.onClick} color="primary">
        เพิ่มการถ่ายทำ
      </Typography>
    </div>
  )
}

export default AddShootingButton
