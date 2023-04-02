import { Typography } from '@mui/material'
import React from 'react'

import JobCard from './components/JobCard'
import { CardBoxContainer } from './styled'
import { JobCardContainerProps } from './types'

export default function JobCardContainer(props: JobCardContainerProps) {
  const { jobs, maxPage, isHistory } = props
  return (
    <CardBoxContainer>
      {maxPage === 0 && (
        <Typography
          variant="subtitle1"
          sx={{
            width: '100%',
            textAlign: 'center',
            color: 'rgba(0, 0, 0, 0.38)',
            paddingBottom: '12px',
          }}
        >
          {'ไม่พบงานที่คุณต้องการหา'}
        </Typography>
      )}
      {jobs.map((item) => {
        return (
          <div
            key={`Job-${item.jobId}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              width: '100%',
              gap: '1rem',
            }}
          >
            <JobCard isHistory={isHistory} {...item} />
          </div>
        )
      })}
    </CardBoxContainer>
  )
}
