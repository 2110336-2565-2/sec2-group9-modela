import { Divider } from '@mui/material'
import React from 'react'

import Footer from './components/Footer'
import Header from './components/Header'
import JobDetail from './components/JobDetail'
import { CardContainer } from './styled'
import { CardProps } from './type'

export default function JobCard(prop: CardProps) {
  const {
    actorCount,
    castingImage,
    companyName,
    description,
    dueDate,
    gender,
    title,
    wage,
  } = prop

  return (
    <CardContainer>
      <Header
        title={title}
        companyName={companyName}
        castingImage={castingImage}
      />
      <JobDetail job={description} />

      <Divider variant="middle" style={{ width: '90%' }} />
      <Footer
        dueDate={dueDate}
        gender={gender}
        wage={wage}
        actorCount={actorCount}
      />
    </CardContainer>
  )
}
