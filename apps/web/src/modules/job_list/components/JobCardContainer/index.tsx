import React from 'react'

import JobCard from './components/JobCard'
import { CardBoxContainer } from './styled'
import { CardArray } from './type'

export default function JobCardContainer(prop: CardArray) {
  const { cardData } = prop

  return (
    <CardBoxContainer>
      {cardData.map((item, index) => {
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
              castingImage={item.castingImage}
              gender={item.gender}
              actorCount={item.actorCount}
              wage={item.wage}
              dueDate={item.dueDate}
            />
          </div>
        )
      })}
    </CardBoxContainer>
  )
}
