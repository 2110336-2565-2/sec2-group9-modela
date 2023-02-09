import {
  ArrowDropDownOutlined,
  DateRangeOutlined,
  Schedule,
} from '@mui/icons-material'
import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker'
import TextField from 'common/components/TextField'
import { Dayjs } from 'dayjs'
import React from 'react'

import { FilterBox } from './style'

export default function SearchBox() {
  const [startShooting, setStartShooting] = React.useState<Dayjs | null>(null)
  const [endShooting, setEndShooting] = React.useState<Dayjs | null>(null)
  return (
    <FilterBox>
      <Typography variant="body1"> การถ่ายทำ </Typography>
      <TextField
        fullWidth
        label="วันถ่ายทำ"
        InputProps={{ endAdornment: <DateRangeOutlined color="primary" /> }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileTimePicker
          label="เวลาเริ่มต้นการถ่ายทำ"
          value={startShooting}
          onChange={(newValue) => {
            setStartShooting(newValue)
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <Schedule color="primary" sx={{ cursor: 'pointer' }} />
                ),
              }}
            />
          )}
        />
        <MobileTimePicker
          label="เวลาสิ้นสุดการถ่ายทำ"
          value={endShooting}
          onChange={(newValue) => {
            setEndShooting(newValue)
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <Schedule color="primary" sx={{ cursor: 'pointer' }} />
                ),
              }}
            />
          )}
        />
      </LocalizationProvider>

      <TextField fullWidth label="สถานที่ถ่ายทำ" />

      <Divider variant="middle" sx={{ width: '90%' }} />

      <Typography variant="body1"> อายุนักแสดง </Typography>
      <TextField fullWidth type="number" label="กรอกอายุนักแสดง" />

      <Divider variant="middle" sx={{ width: '90%' }} />
      <Typography variant="body1"> ค่าจ้าง </Typography>
      <TextField
        fullWidth
        placeholder="10000"
        InputProps={{ endAdornment: <ArrowDropDownOutlined color="primary" /> }}
      />

      <Typography variant="subtitle2" sx={{ color: 'rgba(0,0,0,0.6)' }}>
        +- ไม่เกิน
      </Typography>
      <TextField
        fullWidth
        placeholder="1000"
        InputProps={{ endAdornment: <ArrowDropDownOutlined color="primary" /> }}
      />

      <Divider variant="middle" sx={{ width: '90%' }} />
      <Typography variant="body1"> สถานะการเปิดรับสมัคร </Typography>
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="เปิดรับสมัคร" />
        <FormControlLabel control={<Checkbox />} label="ปิดรับสมัคร" />
      </FormGroup>

      <Divider variant="middle" sx={{ width: '90%' }} />
      <Typography variant="body1"> เพศ </Typography>
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="ชาย" />
        <FormControlLabel control={<Checkbox />} label="หญิง" />
        <FormControlLabel control={<Checkbox />} label="อื่นๆ" />
      </FormGroup>
    </FilterBox>
  )
}
