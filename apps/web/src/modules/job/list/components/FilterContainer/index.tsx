import { AccessTime, DateRangeOutlined } from '@mui/icons-material'
import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker'
import TextField from 'common/components/TextField'
import React from 'react'

import { FilterBox } from './styled'
import { FilterContainerProps } from './types'

export default function SearchBox(props: FilterContainerProps) {
  const { state, setState } = props
  return (
    <FilterBox>
      <Typography variant="body1"> การถ่ายทำ </Typography>
      <MobileDatePicker
        label="วันเริ่มการถ่ายทำ"
        value={state.startDate}
        onChange={(newValue) => {
          setState({ ...state, startDate: newValue })
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              endAdornment: <DateRangeOutlined color="primary" />,
            }}
          />
        )}
      />
      <MobileDatePicker
        label="วันสิ้นสุดถ่ายทำ"
        value={state.endDate}
        onChange={(newValue) => {
          setState({ ...state, endDate: newValue })
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              endAdornment: <DateRangeOutlined color="primary" />,
            }}
          />
        )}
      />
      <MobileTimePicker
        label="เวลาเริ่มต้นการถ่ายทำ"
        value={state.startTime}
        onChange={(newValue) => {
          setState({ ...state, startTime: newValue })
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <AccessTime color="primary" sx={{ cursor: 'pointer' }} />
              ),
            }}
          />
        )}
      />
      <MobileTimePicker
        label="เวลาสิ้นสุดการถ่ายทำ"
        value={state.endTime}
        onChange={(newValue) => {
          setState({ ...state, endTime: newValue })
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <AccessTime color="primary" sx={{ cursor: 'pointer' }} />
              ),
            }}
          />
        )}
      />

      <TextField
        fullWidth
        label="สถานที่ถ่ายทำ"
        value={state.location}
        onChange={(event) => {
          setState({ ...state, location: event.target.value })
        }}
      />

      <Divider variant="middle" sx={{ width: '90%' }} />

      <Typography variant="body1"> อายุนักแสดง </Typography>
      <TextField
        fullWidth
        type="number"
        label="กรอกอายุนักแสดง"
        value={state.age}
        onChange={(event) => {
          setState({ ...state, age: Number(event.target.value) })
        }}
      />

      <Divider variant="middle" sx={{ width: '90%' }} />
      <Typography variant="body1"> ค่าจ้าง </Typography>
      <TextField
        fullWidth
        type="number"
        onChange={(event) =>
          setState({ ...state, wage: Number(event.target.value) })
        }
        value={state.wage}
        placeholder="10000"
      />

      <Typography variant="subtitle2" sx={{ color: 'rgba(0,0,0,0.6)' }}>
        +- ไม่เกิน
      </Typography>
      <TextField
        fullWidth
        type="number"
        onChange={(event) =>
          setState({ ...state, deviant: Number(event.target.value) })
        }
        value={state.deviant}
        placeholder="1000"
      />

      <Divider variant="middle" sx={{ width: '90%' }} />
      <Typography variant="body1"> สถานะการเปิดรับสมัคร </Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={state.openCheck}
              onChange={(event) =>
                setState({ ...state, openCheck: event.target.checked })
              }
            />
          }
          label="เปิดรับสมัคร"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.closeCheck}
              onChange={(event) =>
                setState({ ...state, closeCheck: event.target.checked })
              }
            />
          }
          label="ปิดรับสมัคร"
        />
      </FormGroup>

      <Divider variant="middle" sx={{ width: '90%' }} />
      <Typography variant="body1"> เพศ </Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={state.maleCheck}
              onChange={(event) =>
                setState({ ...state, maleCheck: event.target.checked })
              }
            />
          }
          label="ชาย"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.femaleCheck}
              onChange={(event) =>
                setState({ ...state, femaleCheck: event.target.checked })
              }
            />
          }
          label="หญิง"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.otherCheck}
              onChange={(event) =>
                setState({ ...state, otherCheck: event.target.checked })
              }
            />
          }
          label="อื่นๆ"
        />
      </FormGroup>
    </FilterBox>
  )
}
