import { GetJobDto, ShootingDto } from '@modela/dtos'
import { Divider, Typography } from '@mui/material'
import { genderTranslationMap } from 'common/types/gender'
import JobCardFooter from 'modules/job/components/JobCardFooter'
import JobCardHeader from 'modules/job/components/JobCardHeader'
import React from 'react'

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
    jobId,
  } = prop

  const genderThai = genderTranslationMap[gender]

  return (
    <CardContainer>
      <JobCardHeader
        title={title}
        companyName={companyName}
        castingImage={jobCastingImageUrl}
        status={status}
        jobId={jobId}
        isDetail
      />
      <CorporateRow>
        <Typography
          variant="subtitle2"
          sx={{
            color: 'rgba(0,0,0,0.6)',
            wordBreak: 'break-word',
            whiteSpace: 'pre-line',
          }}
        >
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
        <Typography variant="subtitle2" sx={{ wordBreak: 'break-word' }}>
          บทบาทที่ต้องการ: {role}
        </Typography>
        <Typography variant="subtitle2">เพศ: {genderThai}</Typography>
        <Typography variant="subtitle2">จำนวนคนที่รับ: {actorCount}</Typography>
        <Typography variant="subtitle2">
          อายุ: {minAge}-{maxAge} ปี
        </Typography>
        <Typography variant="subtitle2">
          ค้าจ้าง: {wage.toLocaleString()} บาท ต่อคน
        </Typography>
      </DescriptionRow>

      {shooting.length > 0 && (
        <Typography variant="h6" color="primary">
          รายละเอียดงาน
        </Typography>
      )}
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
