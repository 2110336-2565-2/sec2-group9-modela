import { Divider, Typography } from '@mui/material'
import React from 'react'

import Footer from './footer'
import Header from './header'
import ShootingDetail from './shootingDetail'
import { CardContainer, DescriptionRow } from './styled'
import { cardProps, shooting } from './type'

export default function Card(prop: cardProps) {
  return (
    <CardContainer>
      <Header
        title={prop.title}
        companyName={prop.companyName}
        castingImage={prop.castingImage}
      />
      <DescriptionRow>
        <Typography variant="subtitle2" sx={{ color: 'rgba(0,0,0,0.6)' }}>
          {prop.description}
        </Typography>
      </DescriptionRow>
      <Divider variant="middle" style={{ width: '90%' }} />

      <Typography variant="h6" color="primary">
        รายละเอียดนักแสดงที่ต้องการ
      </Typography>
      <Typography variant="subtitle2">บทบาทที่ต้องการ: {prop.role}</Typography>
      <Typography variant="subtitle2">เพศ: {prop.gender}</Typography>
      <Typography variant="subtitle2">
        จำนวนคนที่รับ: {prop.actorCount}
      </Typography>
      <Typography variant="subtitle2">
        อายุ: {prop.minAge}-{prop.maxAge} ปี
      </Typography>
      <Typography variant="subtitle2">
        ค้าจ้าง: {prop.wage.toLocaleString()} บาท ต่อคน
      </Typography>

      <Typography variant="h6" color="primary">
        รายละเอียดงาน
      </Typography>
      {prop.shootingList.map((item: shooting, idx: number) => (
        <ShootingDetail data={item} idx={idx} key={idx} />
      ))}

      <Divider variant="middle" style={{ width: '90%' }} />
      <Footer dueDate={new Date()} gender="male" wage={5000} actorCount={4} />
    </CardContainer>
  )
}
