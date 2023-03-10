import { ReportDto } from '@modela/dtos'
import { Typography } from '@mui/material'
import React from 'react'

const ReportDetail = ({ reporterName, reason }: ReportDto) => {
  return (
    <div style={{ marginTop: '1rem' }}>
      <Typography variant="body1">
        ได้รับการแจ้งปัญหาจาก คุณ {reporterName}
      </Typography>
      <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.6)' }}>
        เหตุผล: {reason}
      </Typography>
    </div>
  )
}

export default ReportDetail
