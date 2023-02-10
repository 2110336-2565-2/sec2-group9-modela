import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import TextField from 'common/components/TextField'
import React from 'react'

export default function SearchBox() {
  return (
    <TextField
      placeholder="ค้นหางานทั้งหมด"
      InputProps={{ endAdornment: <SearchOutlinedIcon color="primary" /> }}
    />
  )
}
