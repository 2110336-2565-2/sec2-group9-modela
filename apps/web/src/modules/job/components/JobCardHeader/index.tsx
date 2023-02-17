import { JobStatus, UserType } from '@modela/dtos'
import { EditOutlined, ReportOutlined } from '@mui/icons-material'
import { IconButton, Tooltip, Typography } from '@mui/material'
import ProfileImage from 'common/components/ProfileImage'
import { useUser } from 'common/context/UserContext'
import React from 'react'

import { HeaderRow, TitleContainer } from './styled'
import { HeaderProps } from './types'

const JobCardHeader = (prop: HeaderProps) => {
  const {
    jobCastingImageUrl,
    companyName,
    title,
    status,
    jobId,
    isDetail,
    castingId,
    castingName,
  } = prop
  const { user } = useUser()

  return (
    <HeaderRow>
      <ProfileImage
        src={jobCastingImageUrl}
        firstName={castingName}
        userId={castingId}
        sx={{ marginTop: '4px' }}
      />
      <TitleContainer>
        <Typography variant="h6" sx={{ wordBreak: 'break-word' }}>
          {!isDetail &&
            `${title.substring(0, 50)}${title.length >= 50 ? '...' : ''}`}
          {isDetail && title}
        </Typography>
        <Typography fontWeight={400} sx={{ wordBreak: 'break-word' }}>
          {companyName}
        </Typography>
      </TitleContainer>
      {user?.type === UserType.ACTOR && (
        <Tooltip title="Report job">
          <IconButton
            href={`/report/${jobId}`}
            onClick={(ev) => ev.stopPropagation()}
          >
            <ReportOutlined fontSize="small" color="error" />
          </IconButton>
        </Tooltip>
      )}
      {user?.type === UserType.CASTING && status === JobStatus.OPEN && (
        <Tooltip title="Edit job">
          <IconButton
            href={`/job/${jobId}/edit`}
            onClick={(ev) => ev.stopPropagation()}
          >
            <EditOutlined fontSize="small" color="primary" />
          </IconButton>
        </Tooltip>
      )}
    </HeaderRow>
  )
}
export default JobCardHeader
