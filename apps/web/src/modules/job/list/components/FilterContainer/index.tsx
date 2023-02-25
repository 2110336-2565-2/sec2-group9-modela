import { AccessTime, DateRangeOutlined } from '@mui/icons-material'
import {
  Button,
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

export default function FilterContainer(props: FilterContainerProps) {
  const { state, setState, isTitle, filterData, isAdmin } = props
  return (
    <FilterBox
      onSubmit={(event) => {
        event.preventDefault()
        filterData(state)
      }}
    >
      {isTitle && (
        <TextField
          fullWidth
          label="ชื่องาน"
          value={state.title}
          onChange={(event) => {
            setState({ ...state, title: event.target.value })
          }}
        />
      )}
      {isAdmin && (
        <FormGroup>
          <Typography variant="body1"> แจ้งปัญหา </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.reportCheck}
                onChange={(event) =>
                  setState({ ...state, reportCheck: event.target.checked })
                }
              />
            }
            label={
              <Typography variant="subtitle2">
                งานที่ได้รับการแจ้งปัญหา
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.cancleCheck}
                onChange={(event) =>
                  setState({ ...state, cancleCheck: event.target.checked })
                }
              />
            }
            label={<Typography variant="subtitle2">งานที่ถูกยกเลิก</Typography>}
          />
          <Divider sx={{ width: '100%' }} />
        </FormGroup>
      )}
      <Typography variant="body1"> การถ่ายทำ </Typography>
      <MobileDatePicker
        label="วันเริ่มการถ่ายทำ"
        value={state.startDate}
        onChange={(newValue) => {
          setState({ ...state, startDate: newValue })
        }}
        inputFormat="DD/MM/YYYY"
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth={true}
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
        inputFormat="DD/MM/YYYY"
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth={true}
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
        ampm={false}
        onChange={(newValue) => {
          setState({ ...state, startTime: newValue })
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth={true}
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
        ampm={false}
        onChange={(newValue) => {
          setState({ ...state, endTime: newValue })
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth={true}
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

      <Divider sx={{ width: '100%' }} />

      <Typography variant="body1"> อายุนักแสดง </Typography>
      <TextField
        fullWidth
        type="number"
        inputProps={{ min: 0 }}
        label="กรอกอายุนักแสดง"
        value={state.age}
        onChange={(event) => {
          if (event.target.value != '') {
            setState({ ...state, age: Number(event.target.value) })
          } else {
            setState({ ...state, age: null })
          }
        }}
      />

      <Divider sx={{ width: '100%' }} />
      <Typography variant="body1"> ค่าจ้าง </Typography>
      <TextField
        fullWidth
        type="number"
        inputProps={{ min: 0 }}
        onChange={(event) => {
          if (event.target.value != '') {
            setState({ ...state, wage: Number(event.target.value) })
          } else {
            setState({ ...state, wage: null })
          }
        }}
        value={state.wage}
        placeholder="10000"
      />

      <Typography variant="subtitle2" sx={{ color: 'rgba(0,0,0,0.6)' }}>
        +- ไม่เกิน
      </Typography>
      <TextField
        fullWidth
        type="number"
        inputProps={{ min: 0 }}
        onChange={(event) => {
          if (event.target.value != '') {
            setState({ ...state, deviant: Number(event.target.value) })
          } else {
            setState({ ...state, deviant: null })
          }
        }}
        value={state.deviant}
        placeholder="1000"
      />

      <Divider sx={{ width: '100%' }} />
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
          label={<Typography variant="subtitle2">เปิดรับสมัคร</Typography>}
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
          label={<Typography variant="subtitle2">ปิดรับสมัคร</Typography>}
        />
      </FormGroup>

      <Divider sx={{ width: '100%' }} />
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
          label={<Typography variant="subtitle2">ชาย</Typography>}
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
          label={<Typography variant="subtitle2">หญิง</Typography>}
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
          label={<Typography variant="subtitle2">อื่นๆ</Typography>}
        />
      </FormGroup>
      <Button type="submit" sx={{ display: 'none' }}>
        Submit
      </Button>
    </FilterBox>
  )
}
