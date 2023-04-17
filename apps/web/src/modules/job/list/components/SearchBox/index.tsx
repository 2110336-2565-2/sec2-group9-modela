import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import TextField from 'common/components/TextField'
import React from 'react'

import { SearchBoxProps } from './types'

export default function SearchBox(props: SearchBoxProps) {
  const { filterData, state, setState, labels } = props
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        filterData(state)
      }}
    >
      <TextField
        placeholder={labels}
        fullWidth={true}
        value={state.title}
        onChange={(event) => {
          setState((prev) => ({ ...prev, title: event.target.value }))
        }}
        InputProps={{
          endAdornment: (
            <SearchOutlinedIcon
              type="submit"
              color="primary"
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                filterData(state)
              }}
            />
          ),
        }}
      />
    </form>
  )
}
