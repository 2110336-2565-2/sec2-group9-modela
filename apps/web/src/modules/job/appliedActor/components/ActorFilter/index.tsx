import { Checkbox, Typography } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'

import { FILTER_FIELDS } from './constants'
import { FilterItem } from './styled'
import { ActorFilterProps } from './types'

const ActorFilter = ({ control }: ActorFilterProps) => {
  return (
    <div style={{ position: 'sticky', top: '48px' }}>
      <Typography variant="body1" sx={{ marginLeft: '8px' }}>
        สถานะการสมัคร
      </Typography>
      {FILTER_FIELDS.map(({ status, label }, idx) => (
        <FilterItem key={idx}>
          <Controller
            name={status}
            control={control}
            render={({ field: { ref, ...field } }) => (
              <Checkbox checked={field.value} {...field} inputRef={ref} />
            )}
          />
          <Typography variant="subtitle2">{label}</Typography>
        </FilterItem>
      ))}
    </div>
  )
}

export default ActorFilter
