import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import TextField from 'common/components/TextField'
import React from 'react'

import { SearchBoxProps } from './types'

export default function SearchBox(prop: SearchBoxProps) {
  const { filterData, state } = prop
  return (
    <TextField
      placeholder="ค้นหางานทั้งหมด"
      InputProps={{
        endAdornment: (
          <SearchOutlinedIcon
            color="primary"
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              filterData(state)
            }}
          />
        ),
      }}
    />
  )
}
