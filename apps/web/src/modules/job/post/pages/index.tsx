import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import { DesktopDatePicker, TimePicker } from '@mui/x-date-pickers'
import React from 'react'
import { Controller } from 'react-hook-form'

import { GENDER_CHOICE } from '../constant'
import useJobForm from '../hooks/useJobForm'
import { RootContainer } from './styled'

const PostJobPage = () => {
  const { control, handleClickSubmit, fields, append } = useJobForm()
  return (
    <RootContainer onSubmit={handleClickSubmit}>
      <Grid container spacing={2} sx={{ padding: '12px' }}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            รายละเอียดงาน
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="jobName"
            control={control}
            render={(props) => (
              <TextField
                required
                fullWidth
                label="ชื่องาน"
                {...props.field}
                error={props.fieldState.invalid}
                helperText={props.fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="jobDescription"
            control={control}
            render={(props) => (
              <TextField
                required
                fullWidth
                multiline
                rows={3}
                label="รายละเอียดงาน"
                {...props.field}
                error={props.fieldState.invalid}
                helperText={props.fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="dueDate"
            control={control}
            render={(props) => (
              <DesktopDatePicker
                label="วันที่ปิดรับสมัคร"
                inputFormat="DD/MM/YYYY"
                value={props.field.value}
                onChange={(newValue) => props.field.onChange(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="wage"
            control={control}
            render={(props) => (
              <TextField
                required
                fullWidth
                label="ค่าจ้างต่อคน"
                type="number"
                {...props.field}
                error={props.fieldState.invalid}
                helperText={props.fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          {fields.map((field, index) => {
            return (
              <>
                <Grid item xs={12} key={field.id}>
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
                <Grid xs={6} item key={field.id}>
                  <Controller
                    name={`shooting.${index}.startDate`}
                    control={control}
                    render={(props) => (
                      <DesktopDatePicker
                        label="วันที่เริ่มถ่ายทำ"
                        inputFormat="DD/MM/YYYY"
                        value={props.field.value}
                        onChange={(newValue) => props.field.onChange(newValue)}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid xs={6} item key={field.id}>
                  <Controller
                    name={`shooting.${index}.endDate`}
                    control={control}
                    render={(props) => (
                      <DesktopDatePicker
                        label="วันที่สิ้นสุดถ่ายทำ"
                        inputFormat="DD/MM/YYYY"
                        value={props.field.value}
                        onChange={(newValue) => props.field.onChange(newValue)}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid xs={6} item key={field.id}>
                  <Controller
                    name={`shooting.${index}.startTime`}
                    control={control}
                    render={(props) => (
                      <TimePicker
                        label="เวลาเริ่มถ่ายทำในแต่ละวัน"
                        value={props.field.value}
                        onChange={(newValue) => props.field.onChange(newValue)}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid xs={6} item key={field.id}>
                  <Controller
                    name={`shooting.${index}.endTime`}
                    control={control}
                    render={(props) => (
                      <TimePicker
                        label="เวลาสิ้นสุดถ่ายทำในแต่ละวัน"
                        value={props.field.value}
                        onChange={(newValue) => props.field.onChange(newValue)}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth />
                        )}
                      />
                    )}
                  />
                </Grid>
              </>
            )
          })}
        </Grid>
        <Grid item xs={12}>
          <Typography onClick={() => append({})}>+เพิ่มการถ่ายทำ</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            รายละเอียดนักแสดง
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="actorCount"
            control={control}
            render={(props) => (
              <TextField
                required
                fullWidth
                label="จำนวน"
                {...props.field}
                error={props.fieldState.invalid}
                helperText={props.fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="gender"
            control={control}
            render={(props) => (
              <TextField
                select
                required
                fullWidth
                label="เพศ"
                {...props.field}
                error={props.fieldState.invalid}
                helperText={props.fieldState.error?.message}
              >
                {GENDER_CHOICE.map((choice) => (
                  <MenuItem
                    {...choice}
                    key={choice.value?.toString() || `${Math.random()}`}
                  />
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="minAge"
            control={control}
            render={(props) => (
              <TextField
                required
                fullWidth
                label="อายุต่ำสุด"
                {...props.field}
                error={props.fieldState.invalid}
                helperText={props.fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="maxAge"
            control={control}
            render={(props) => (
              <TextField
                required
                fullWidth
                label="อายุสูงสุด"
                {...props.field}
                error={props.fieldState.invalid}
                helperText={props.fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="role"
            control={control}
            render={(props) => (
              <TextField
                required
                fullWidth
                multiline
                rows={3}
                label="รายละเอียดนักแสดง"
                {...props.field}
                error={props.fieldState.invalid}
                helperText={props.fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
      </Grid>
    </RootContainer>
  )
}

export default PostJobPage
