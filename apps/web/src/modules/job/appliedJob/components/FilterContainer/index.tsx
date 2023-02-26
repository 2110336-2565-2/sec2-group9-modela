import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material'
import TextField from 'common/components/TextField'
import React from 'react'

import { FilterBox } from './styled'
import { FilterContainerProps } from './types'

export default function FilterContainer(props: FilterContainerProps) {
  const { state, setState, isTitle, filterData } = props
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
            setState((prev) => ({
              ...prev,
              title: event.target.value,
            }))
          }}
        />
      )}

      <Typography variant="body1"> สถานะการสมัคร </Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={state.pendingCheck}
              onChange={(event) =>
                setState((prev) => ({
                  ...prev,
                  pendingCheck: event.target.checked,
                }))
              }
            />
          }
          label={<Typography variant="subtitle2">รอคัดเลือก</Typography>}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.offerCheck}
              onChange={(event) =>
                setState((prev) => ({
                  ...prev,
                  offerCheck: event.target.checked,
                }))
              }
            />
          }
          label={<Typography variant="subtitle2">ผ่านการคัดเลือก</Typography>}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.rejectCheck}
              onChange={(event) =>
                setState((prev) => ({
                  ...prev,
                  rejectCheck: event.target.checked,
                }))
              }
            />
          }
          label={
            <Typography variant="subtitle2">ไม่ผ่านการคัดเลือก</Typography>
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.offerAcceptCheck}
              onChange={(event) =>
                setState((prev) => ({
                  ...prev,
                  offerAcceptCheck: event.target.checked,
                }))
              }
            />
          }
          label={<Typography variant="subtitle2">ยอมรับข้อเสนอ</Typography>}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.offerRejectCheck}
              onChange={(event) =>
                setState((prev) => ({
                  ...prev,
                  offerRejectCheck: event.target.checked,
                }))
              }
            />
          }
          label={<Typography variant="subtitle2">ปฏิเสธข้อเสนอ</Typography>}
        />
      </FormGroup>

      <Divider sx={{ width: '100%' }} />
      <Typography variant="body1"> สถานะงาน </Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={state.openCheck}
              onChange={(event) =>
                setState((prev) => ({
                  ...prev,
                  openCheck: event.target.checked,
                }))
              }
            />
          }
          label={<Typography variant="subtitle2">เปิดรับสมัคร</Typography>}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.selectCheck}
              onChange={(event) =>
                setState((prev) => ({
                  ...prev,
                  selectCheck: event.target.checked,
                }))
              }
            />
          }
          label={<Typography variant="subtitle2">กำลังคัดเลือก</Typography>}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.selectEndCheck}
              onChange={(event) =>
                setState((prev) => ({
                  ...prev,
                  selectEndCheck: event.target.checked,
                }))
              }
            />
          }
          label={<Typography variant="subtitle2">กำลังถ่ายทำ</Typography>}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.finishCheck}
              onChange={(event) =>
                setState((prev) => ({
                  ...prev,
                  finishCheck: event.target.checked,
                }))
              }
            />
          }
          label={<Typography variant="subtitle2">ถ่ายทำเสร็จสิ้น</Typography>}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.cancelCheck}
              onChange={(event) =>
                setState((prev) => ({
                  ...prev,
                  cancelCheck: event.target.checked,
                }))
              }
            />
          }
          label={<Typography variant="subtitle2">งานถูกยกเลิก</Typography>}
        />
      </FormGroup>

      <Button type="submit" sx={{ display: 'none' }}>
        Submit
      </Button>
    </FilterBox>
  )
}
