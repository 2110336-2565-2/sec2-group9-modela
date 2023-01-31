import { QueryBuilderOutlined } from '@mui/icons-material'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import { Typography } from '@mui/material'
import { formatDate, formatTime } from 'common/utils/formatter'
import React from 'react'

import { Shooting } from '../../type'
import { Line } from './styled'

export default function ShootingDetail(prop: { data: Shooting; idx: number }) {
  return (
    <>
      <Typography variant="subtitle1">ถ่ายครั้งที่: {prop.idx + 1}</Typography>
      <Line>
        <LocationOnOutlinedIcon fontSize="small" />
        <Typography variant="subtitle2">{prop.data.location}</Typography>
      </Line>
      <Line>
        <CalendarMonthOutlinedIcon fontSize="small" />
        <Typography variant="subtitle2">
          {formatDate(prop.data.startDate)} - {formatDate(prop.data.endDate)}
        </Typography>
      </Line>
      <Line>
        <QueryBuilderOutlined fontSize="small" />
        <Typography variant="subtitle2">
          {formatTime(prop.data.startTimes)} - {formatTime(prop.data.endTimes)}
        </Typography>
      </Line>
    </>
  )
}
