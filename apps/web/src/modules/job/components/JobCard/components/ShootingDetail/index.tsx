import {
  CalendarMonthOutlined,
  LocationOnOutlined,
  QueryBuilderOutlined,
} from '@mui/icons-material'
import { Typography } from '@mui/material'
import { formatDate, formatTime } from 'common/utils/formatter'
import React from 'react'

import { Line } from './styled'
import { ShootingDetailProps } from './type'

const ShootingDetail = (prop: ShootingDetailProps) => {
  const { data, idx } = prop

  return (
    <div style={{ marginTop: '1rem' }}>
      <Typography variant="subtitle1">ถ่ายครั้งที่: {idx + 1}</Typography>
      <Line>
        <LocationOnOutlined fontSize="small" />
        <Typography variant="subtitle2">{data.shootingLocation}</Typography>
      </Line>
      <Line>
        <CalendarMonthOutlined fontSize="small" />
        <Typography variant="subtitle2">
          {formatDate(data.startDate)} - {formatDate(data.endDate)}
        </Typography>
      </Line>
      <Line>
        <QueryBuilderOutlined fontSize="small" />
        <Typography variant="subtitle2">
          {formatTime(data.startTime)} - {formatTime(data.endTime)}
        </Typography>
      </Line>
    </div>
  )
}

export default ShootingDetail
