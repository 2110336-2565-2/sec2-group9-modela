import { ResumeDto } from '@modela/dtos'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import TextField from 'common/components/TextField'
import React from 'react'

import { ApplyProps } from './types'

export default function SelectResume(props: ApplyProps) {
  const { id, setId, resumes } = props
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(Number(event.target.value))
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <TextField
          select
          value={id}
          label="เลือก resume"
          onChange={handleChange}
          required
        >
          {resumes.map(({ resumeId, name }: ResumeDto) => (
            <MenuItem key={resumeId} value={resumeId}>
              {name}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    </Box>
  )
}
