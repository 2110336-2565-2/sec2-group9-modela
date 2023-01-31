import { QueryBuilderOutlined } from '@mui/icons-material'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import { Typography } from '@mui/material'
import React from 'react'

import { shooting } from '../type'
import { Line } from './styled'

export default function ShootingDetail(prop: { data: shooting; idx: number }) {
  const formatDate = (date: Date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = (date.getFullYear() + 543).toString().slice(2)
    return `${day}/${month}/${year}`
  }

  const formatTime = (time: Date) => {
    const hour = time.getHours()
    const minute = time.getMinutes()
    return `${hour}:${minute}`
  }

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
