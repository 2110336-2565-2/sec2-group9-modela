import { GetJobDto, ShootingDto } from '@modela/dtos'
import { Divider, Typography } from '@mui/material'
import React from 'react'

import JobCardFooter from './components/JobCardFooter'
import JobCardHeader from './components/JobCardHeader'
import ShootingDetail from './components/ShootingDetail'
import { CardContainer, CorporateRow, DescriptionRow } from './styled'

const JobCard = (prop: GetJobDto) => {
  const {
    actorCount,
    jobCastingImageUrl,
    companyName,
    description,
    gender,
    minAge,
    maxAge,
    applicationDeadline,
    role,
    shooting,
    status,
    title,
    wage,
  } = prop

  return (
    <CardContainer>
      <JobCardHeader
        title={title}
        companyName={companyName}
        castingImage={jobCastingImageUrl}
      />
      <CorporateRow>
        <Typography variant="subtitle2" sx={{ color: 'rgba(0,0,0,0.6)' }}>
          {description}
        </Typography>
      </CorporateRow>
      <Divider sx={{ width: '100%', marginTop: '1rem' }} />

      <DescriptionRow>
        <Typography
          variant="h6"
          color="primary"
          sx={{ marginBottom: '0.5rem' }}
        >
          รายละเอียดนักแสดงที่ต้องการ
        </Typography>
        <Typography variant="subtitle2">บทบาทที่ต้องการ: {role}</Typography>
        <Typography variant="subtitle2">เพศ: {gender}</Typography>
        <Typography variant="subtitle2">จำนวนคนที่รับ: {actorCount}</Typography>
        <Typography variant="subtitle2">
          อายุ: {minAge}-{maxAge} ปี
        </Typography>
        <Typography variant="subtitle2">
          ค้าจ้าง: {wage.toLocaleString()} บาท ต่อคน
        </Typography>
      </DescriptionRow>

      <Typography variant="h6" color="primary">
        รายละเอียดงาน
      </Typography>
      {shooting.map((item: ShootingDto, idx: number) => (
        <ShootingDetail data={item} idx={idx} key={idx} />
      ))}

      <Divider sx={{ width: '100%', marginTop: '1rem' }} />
      <JobCardFooter
        dueDate={applicationDeadline}
        gender={gender}
        wage={wage}
        actorCount={actorCount}
        status={status}
      />
    </CardContainer>
  )
}
export default JobCard
