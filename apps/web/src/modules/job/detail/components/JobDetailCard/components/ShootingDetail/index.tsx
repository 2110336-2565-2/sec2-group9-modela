import {
  CalendarMonthOutlined,
  LocationOnOutlined,
  QueryBuilderOutlined,
} from '@mui/icons-material'
import { Typography } from '@mui/material'
import { formatDate, formatTime } from 'common/utils/formatter'
import React, { useMemo } from 'react'

import { Line } from './styled'
import { ShootingDetailProps } from './types'

const ShootingDetail = (props: ShootingDetailProps) => {
  const { data, idx } = props
  const Date = useMemo(() => {
    const startDate = formatDate(data.startDate)
    const endDate = formatDate(data.endDate)

    if (startDate === endDate) return startDate
    return startDate + ' - ' + endDate
  }, [data.endDate, data.startDate])

  return (
    <div style={{ marginTop: '1rem' }}>
      <Typography variant="subtitle1">ถ่ายครั้งที่: {idx + 1}</Typography>
      <Line>
        <LocationOnOutlined fontSize="small" />
        <Typography variant="subtitle2" sx={{ wordBreak: 'break-word' }}>
          {data.shootingLocation}
        </Typography>
      </Line>
      <Line>
        <CalendarMonthOutlined fontSize="small" />
        <Typography variant="subtitle2">{Date}</Typography>
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
