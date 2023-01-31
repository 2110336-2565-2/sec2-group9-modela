import { QueryBuilderOutlined } from '@mui/icons-material'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import { Typography } from '@mui/material'
import { formatDate, formatTime } from 'common/utils/formatter'
import React from 'react'

import { Shooting } from '../../type'
import { Line } from './styled'

export default function ShootingDetail(prop: { data: Shooting; idx: number }) {
  const { data, idx } = prop

  return (
    <>
      <Typography variant="subtitle1">ถ่ายครั้งที่: {idx + 1}</Typography>
      <Line>
        <LocationOnOutlinedIcon fontSize="small" />
        <Typography variant="subtitle2">{data.location}</Typography>
      </Line>
      <Line>
        <CalendarMonthOutlinedIcon fontSize="small" />
        <Typography variant="subtitle2">
          {formatDate(data.startDate)} - {formatDate(data.endDate)}
        </Typography>
      </Line>
      <Line>
        <QueryBuilderOutlined fontSize="small" />
        <Typography variant="subtitle2">
          {formatTime(data.startTimes)} - {formatTime(data.endTimes)}
        </Typography>
      </Line>
    </>
  )
}
