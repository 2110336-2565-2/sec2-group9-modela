import { GetJobCardWithMaxPageDto } from '@modela/dtos'
import React from 'react'

import JobCard from './components/JobCard'
import { CardBoxContainer } from './styled'

export default function JobCardContainer(prop: GetJobCardWithMaxPageDto) {
  const { jobs } = prop
  return (
    <CardBoxContainer>
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
            <JobCard {...item} />
          </div>
        )
      })}
    </CardBoxContainer>
  )
}
