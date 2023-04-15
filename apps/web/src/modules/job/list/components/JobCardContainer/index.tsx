import { Typography } from '@mui/material'
import JobCard from 'common/components/JobCard'
import { JobCardType } from 'common/components/JobCard/types'
import { useUser } from 'common/context/UserContext'
import React from 'react'

import { CardBoxContainer } from './styled'
import { JobCardContainerProps } from './types'
import { getCardType } from './utils'

export default function JobCardContainer(props: JobCardContainerProps) {
  const { jobs, maxPage, isHistory } = props
  const { user } = useUser()

  let cardType: JobCardType = getCardType(user!.type, isHistory)

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
            <JobCard {...item} type={cardType} />
          </div>
        )
      })}
    </CardBoxContainer>
  )
}
