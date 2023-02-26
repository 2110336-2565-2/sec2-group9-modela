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
            setState({ ...state, title: event.target.value })
          }}
        />
      )}

      <Divider sx={{ width: '100%' }} />
      <Typography variant="body1"> สถานะการสมัคร </Typography>
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
      <Button type="submit" sx={{ display: 'none' }}>
        Submit
      </Button>
    </FilterBox>
  )
}
