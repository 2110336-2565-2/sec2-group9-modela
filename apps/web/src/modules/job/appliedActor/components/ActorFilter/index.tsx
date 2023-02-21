import { Checkbox, Typography } from '@mui/material'
import React from 'react'

import { FilterItem } from './styled'

const ActorFilter = () => {
  return (
    <div>
      <Typography variant="body1" sx={{ marginLeft: '8px' }}>
        สถานะการสมัคร
      </Typography>
      <FilterItem>
        <Checkbox />
        <Typography variant="subtitle2">รอคัดเลือก</Typography>
      </FilterItem>
      <FilterItem>
        <Checkbox />
        <Typography variant="subtitle2">ผ่านการคัดเลือก</Typography>
      </FilterItem>
      <FilterItem>
        <Checkbox />
        <Typography variant="subtitle2">ไม่ผ่านการคัดเลือก</Typography>
      </FilterItem>
    </div>
  )
}

export default ActorFilter
