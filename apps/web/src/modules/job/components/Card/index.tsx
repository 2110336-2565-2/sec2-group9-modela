import { GetJobDto, ShootingDto } from '@modela/dtos'
import { Divider, Typography } from '@mui/material'
import React from 'react'

import Footer from './components/Footer'
import Header from './components/Header'
import ShootingDetail from './components/ShootingDetail'
import { CardContainer, DescriptionRow } from './styled'

export default function Card(prop: GetJobDto) {
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
    title,
    wage,
  } = prop

  return (
    <CardContainer>
      <Header
        title={title}
        companyName={companyName}
        castingImage={jobCastingImageUrl}
      />
      <DescriptionRow>
        <Typography variant="subtitle2" sx={{ color: 'rgba(0,0,0,0.6)' }}>
          {description}
        </Typography>
      </DescriptionRow>
      <Divider variant="middle" style={{ width: '90%' }} />

      <Typography variant="h6" color="primary">
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

      <Typography variant="h6" color="primary">
        รายละเอียดงาน
      </Typography>
      {shooting.map((item: ShootingDto, idx: number) => (
        <ShootingDetail data={item} idx={idx} key={idx} />
      ))}

      <Divider variant="middle" style={{ width: '90%' }} />
      <Footer
        dueDate={applicationDeadline}
        gender={gender}
        wage={wage}
        actorCount={actorCount}
      />
    </CardContainer>
  )
}
