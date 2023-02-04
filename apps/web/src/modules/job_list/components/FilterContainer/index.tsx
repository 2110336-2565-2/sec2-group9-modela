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
import React from 'react'

import TextField from '../../../../common/components/TextField'
import { FilterBox } from './style'

export default function SearchBox() {
  return (
    <FilterBox>
      <Typography variant="body1"> การถ่ายทำ </Typography>
      <TextField
        fullWidth
        label="วันถ่ายทำ"
        InputProps={{ endAdornment: <DateRangeOutlined color="primary" /> }}
      />
      <TextField
        fullWidth
        label="เวลาเริ่มต้นการถ่ายทำ"
        InputProps={{ endAdornment: <Schedule color="primary" /> }}
      />
      <TextField
        fullWidth
        label="เวลาสิ้นสุดการถ่ายทำ"
        InputProps={{ endAdornment: <Schedule color="primary" /> }}
      />
      <TextField fullWidth label="สถานที่ถ่ายทำ" />

      <Divider variant="middle" style={{ width: '90%' }} />

      <Typography variant="body1"> อายุนักแสดง </Typography>
      <TextField fullWidth label="กรอกอายุนักแสดง" />

      <Divider variant="middle" style={{ width: '90%' }} />
      <Typography variant="body1"> ค่าจ้าง </Typography>
      <TextField
        fullWidth
        placeholder="10000"
        InputProps={{ endAdornment: <ArrowDropDownOutlined color="primary" /> }}
      />

      <Typography variant="subtitle2" sx={{ color: 'rgba(0,0,0,0.6)' }}>
        {' '}
        +- ไม่เกิน{' '}
      </Typography>
      <TextField
        fullWidth
        placeholder="1000"
        InputProps={{ endAdornment: <ArrowDropDownOutlined color="primary" /> }}
      />

      <Divider variant="middle" style={{ width: '90%' }} />
      <Typography variant="body1"> สถานะการเปิดรับสมัคร </Typography>
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="เปิดรับสมัคร" />
        <FormControlLabel control={<Checkbox />} label="ปิดรับสมัคร" />
      </FormGroup>

      <Divider variant="middle" style={{ width: '90%' }} />
      <Typography variant="body1"> เพศ </Typography>
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="ชาย" />
        <FormControlLabel control={<Checkbox />} label="หญิง" />
        <FormControlLabel control={<Checkbox />} label="อื่นๆ" />
      </FormGroup>
    </FilterBox>
  )
}
