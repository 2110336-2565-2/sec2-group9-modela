import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import React from 'react'

import TextField from '../../../../common/components/TextField'

export default function SearchBox() {
  return (
    <TextField
      placeholder="ค้นหางานทั้งหมด"
      InputProps={{ endAdornment: <SearchOutlinedIcon /> }}
    />
  )
}
