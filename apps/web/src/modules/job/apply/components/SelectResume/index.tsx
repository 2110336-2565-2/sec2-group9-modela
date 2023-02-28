import { ResumeDto } from '@modela/dtos'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import TextField from 'common/components/TextField'
import * as React from 'react'

import { ApplyProps } from './types'

export default function SelectResume(props: ApplyProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setId(Number(event.target.value))
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <TextField
          select
          value={props.Id}
          label="เลือก resume"
          onChange={handleChange}
        >
          {props.resumes.map((resume: ResumeDto) => (
            <MenuItem key={resume.resumeId} value={resume.resumeId}>
              {resume.name}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    </Box>
  )
}
