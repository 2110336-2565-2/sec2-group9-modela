import { SearchOutlined } from '@mui/icons-material'
import TextField from 'common/components/TextField'
import React from 'react'
import { Controller } from 'react-hook-form'

import { SearchFieldProps } from './types'

const SearchField = ({ control, onSubmit }: SearchFieldProps) => {
  return (
    <Controller
      name="name"
      control={control}
      render={({ field: { ref, ...field } }) => (
        <TextField
          placeholder="ค้นหานักแสดงที่สมัครงานนี้"
          fullWidth={true}
          inputRef={ref}
          {...field}
          InputProps={{
            endAdornment: (
              <SearchOutlined
                type="submit"
                color="primary"
                sx={{ cursor: 'pointer' }}
                onClick={onSubmit}
              />
            ),
          }}
        />
      )}
    />
  )
}

export default SearchField
