import { JobStatus, UserType } from '@modela/dtos'
import { EditOutlined, ReportOutlined } from '@mui/icons-material'
import { IconButton, Tooltip, Typography } from '@mui/material'
import { useUser } from 'common/context/UserContext'
import React from 'react'

import { HeaderRow, ProfileImageContainer, TitleContainer } from './styled'
import { HeaderProps } from './types'

const JobCardHeader = (prop: HeaderProps) => {
  const { castingImage, companyName, title, status, jobId, isDetail } = prop
  const { user } = useUser()

  return (
    <HeaderRow>
      <ProfileImageContainer>
        <img src={castingImage} alt="casting pic" width="100%" height="100%" />
      </ProfileImageContainer>
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
          <IconButton href={`/report/${jobId}`}>
            <ReportOutlined fontSize="small" color="error" />
          </IconButton>
        </Tooltip>
      )}
      {user?.type === UserType.CASTING && status === JobStatus.OPEN && (
        <Tooltip title="Edit job">
          <IconButton href={`/job/${jobId}/edit`}>
            <EditOutlined fontSize="small" color="primary" />
          </IconButton>
        </Tooltip>
      )}
    </HeaderRow>
  )
}
export default JobCardHeader
