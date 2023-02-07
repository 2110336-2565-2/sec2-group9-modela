import { Divider } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

import Footer from '../../../../../job/components/JobCard/components/JobCardFooter'
import Header from '../../../../../job/components/JobCard/components/JobCardHeader'
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
    jobId,
    status,
  } = prop
  const router = useRouter()
  const viewDetail = () => {
    router.replace(`/job/${jobId}`)
  }

  return (
    <CardContainer onClick={viewDetail}>
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
        status={status}
      />
    </CardContainer>
  )
}
