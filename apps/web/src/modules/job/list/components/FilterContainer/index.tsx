import {
  AccessTime,
  ArrowDropDownOutlined,
  DateRangeOutlined,
} from '@mui/icons-material'
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
import { Dayjs } from 'dayjs'
import React from 'react'

import { FilterBox } from './styled'

export default function SearchBox() {
  const [startShooting, setStartShooting] = React.useState<Dayjs | null>(null)
  const [endShooting, setEndShooting] = React.useState<Dayjs | null>(null)
  const [date, setDate] = React.useState<Dayjs | null>(null)
  return (
    <FilterBox>
      <Typography variant="body1"> การถ่ายทำ </Typography>
      <MobileDatePicker
        label="วันถ่ายทำ"
        value={date}
        onChange={(newValue) => {
          setDate(newValue)
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
                <AccessTime color="primary" sx={{ cursor: 'pointer' }} />
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
                <AccessTime color="primary" sx={{ cursor: 'pointer' }} />
              ),
            }}
          />
        )}
      />

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
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="เปิดรับสมัคร"
        />
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
