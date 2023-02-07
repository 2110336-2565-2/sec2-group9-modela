import { Remove } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'
import { DesktopDatePicker, TimePicker } from '@mui/x-date-pickers'
import TextField from 'common/components/TextField'
import React from 'react'
import { Controller } from 'react-hook-form'

import { ShootingFormProps } from './types'

const ShootingForm = (prop: ShootingFormProps) => {
  const { index, control, remove } = prop
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
      <Grid item xs={12}>
        <Controller
          name={`shooting.${index}.location`}
          control={control}
          render={(props) => (
            <TextField
              required
              fullWidth
              label="สถานที่ถ่ายทำ"
              {...props.field}
            />
          )}
        />
      </Grid>
      <Grid xs={6} item>
        <Controller
          name={`shooting.${index}.startDate`}
          control={control}
          render={(props) => (
            <DesktopDatePicker
              label="วันที่เริ่มถ่ายทำ"
              inputFormat="DD/MM/YYYY"
              value={props.field.value}
              onChange={(newValue) => props.field.onChange(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          )}
        />
      </Grid>
      <Grid xs={6} item>
        <Controller
          name={`shooting.${index}.endDate`}
          control={control}
          render={(props) => (
            <DesktopDatePicker
              label="วันที่สิ้นสุดถ่ายทำ"
              inputFormat="DD/MM/YYYY"
              value={props.field.value}
              onChange={(newValue) => props.field.onChange(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          )}
        />
      </Grid>
      <Grid xs={6} item>
        <Controller
          name={`shooting.${index}.startTime`}
          control={control}
          render={(props) => (
            <TimePicker
              label="เวลาเริ่มถ่ายทำในแต่ละวัน"
              value={props.field.value}
              onChange={(newValue) => props.field.onChange(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          )}
        />
      </Grid>
      <Grid xs={6} item>
        <Controller
          name={`shooting.${index}.endTime`}
          control={control}
          render={(props) => (
            <TimePicker
              label="เวลาสิ้นสุดถ่ายทำในแต่ละวัน"
              value={props.field.value}
              onChange={(newValue) => props.field.onChange(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          )}
        />
      </Grid>
    </>
  )
}

export default ShootingForm
