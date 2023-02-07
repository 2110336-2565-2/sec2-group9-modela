import { GetJobCardWithMaxPageDto } from '@modela/dtos'
import React from 'react'

import JobCard from './components/JobCard'
import { CardBoxContainer } from './styled'

export default function JobCardContainer(prop: GetJobCardWithMaxPageDto) {
  const { jobs } = prop
  console.log('SS')
  console.log(jobs)
  return (
    <CardBoxContainer>
      {jobs.map((item, index) => {
        return (
          <div
            key={`Job-${index}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              width: '40vw',
              gap: '1rem',
            }}
          >
            <JobCard
              title={item.title}
              companyName={item.companyName}
              description={item.description}
              castingImage={item.jobCastingImageUrl}
              gender={item.gender}
              actorCount={item.actorCount}
              wage={item.wage}
              dueDate={item.applicationDeadline}
              jobId={item.jobId}
            />
          </div>
        )
      })}
    </CardBoxContainer>
  )
}
