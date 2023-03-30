import { UserType } from '@modela/dtos'
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material'
import React from 'react'

import { FilterBox } from './styled'
import { FilterContainerProps } from './types'

export default function FilterContainer(props: FilterContainerProps) {
  const { state, setState, filterData, userType } = props
  return (
    <FilterBox
      onSubmit={(event) => {
        event.preventDefault()
        filterData(state)
      }}
    >
      <Typography variant="body1"> ประเภทการแจ้งเตือน </Typography>
      <FormGroup>
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
        {userType === UserType.ACTOR && (
          <FormControlLabel
            control={
              <Checkbox
                checked={state.receiveCheck}
                onChange={(event) =>
                  setState((prev) => ({
                    ...prev,
                    receiveCheck: event.target.checked,
                  }))
                }
              />
            }
            label={
              <Typography variant="subtitle2">ได้รับข้อเสนองาน</Typography>
            }
          />
        )}
        {userType === UserType.CASTING && (
          <FormControlLabel
            control={
              <Checkbox
                checked={state.acceptCheck}
                onChange={(event) =>
                  setState((prev) => ({
                    ...prev,
                    acceptCheck: event.target.checked,
                  }))
                }
              />
            }
            label={
              <Typography variant="subtitle2">นักแสดงรับข้อเสนอ</Typography>
            }
          />
        )}

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
            <Typography variant="subtitle2">
              {userType === UserType.ACTOR
                ? 'ถูกปฏิเสธ'
                : 'นักแสดงปฏิเสธข้อเสนอ'}
            </Typography>
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.appRefundCheck}
              onChange={(event) =>
                setState((prev) => ({
                  ...prev,
                  appRefundCheck: event.target.checked,
                }))
              }
            />
          }
          label={
            <Typography variant="subtitle2">
              {userType === UserType.ACTOR ? 'ถูกระงับเงิน' : 'ขอคืนเงินสำเร็จ'}
            </Typography>
          }
        />
        {userType === UserType.CASTING && (
          <FormControlLabel
            control={
              <Checkbox
                checked={state.rejectRefundCheck}
                onChange={(event) =>
                  setState((prev) => ({
                    ...prev,
                    rejectRefundCheck: event.target.checked,
                  }))
                }
              />
            }
            label={
              <Typography variant="subtitle2">ขอคืนเงินไม่สำเร็จ</Typography>
            }
          />
        )}
      </FormGroup>
      <Button type="submit" sx={{ display: 'none' }}>
        Submit
      </Button>
    </FilterBox>
  )
}
