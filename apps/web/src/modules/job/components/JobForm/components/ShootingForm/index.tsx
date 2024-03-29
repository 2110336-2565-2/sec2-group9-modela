import { Remove } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'
import FormController from 'common/components/FormController'
import React from 'react'

import { formLayout } from './constant'
import { ShootingFormProps } from './types'

const ShootingForm = (props: ShootingFormProps) => {
  const { index, control, remove } = props
  return (
    <>
      <Grid item xs={12}>
        <div style={{ display: 'flex', margin: '10px 0px' }}>
          <Typography variant="body1" sx={{ marginRight: '20px' }}>
            ถ่ายครั้งที่ {index + 1}
          </Typography>
          <div
            style={{ display: 'flex', cursor: 'pointer' }}
            onClick={() => remove(index)}
          >
            <Remove color="primary" />
            <Typography color="primary">ลบการถ่ายทำ</Typography>
          </div>
        </div>
      </Grid>
      {formLayout(index).map((props) => (
        <FormController
          control={control as any}
          key={JSON.stringify(props)}
          {...props}
        />
      ))}
    </>
  )
}

export default ShootingForm
