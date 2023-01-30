import { Typography } from '@mui/material'
import Image from 'next/image'
import calendar from 'public/calendar.png'
import clock from 'public/clock.png'
import location from 'public/location.png'
import React from 'react'

import { shooting } from '../type'
import { Line } from './styled'

export default function ShootingDetail(prop: { data: shooting; idx: number }) {
  const formatDate = (date: Date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear().toString().slice(2)
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
        <Image src={location} height={18} alt="location" />
        <Typography variant="subtitle2">{prop.data.location}</Typography>
      </Line>
      <Line>
        <Image src={calendar} height={18} alt="location" />
        <Typography variant="subtitle2">
          {formatDate(prop.data.startDate)} - {formatDate(prop.data.endDate)}
        </Typography>
      </Line>
      <Line>
        <Image src={clock} height={18} alt="location" />
        <Typography variant="subtitle2">
          {formatTime(prop.data.startTimes)} - {formatTime(prop.data.endTimes)}
        </Typography>
      </Line>
    </>
  )
}
