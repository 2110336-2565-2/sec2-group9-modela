import { JobStatus, UserType } from '@modela/dtos'
import { EditOutlined, ReportOutlined } from '@mui/icons-material'
import { Tooltip, Typography } from '@mui/material'
import { useUser } from 'common/context/UserContext'
import { useRouter } from 'next/router'
import React from 'react'

import { HeaderRow, ProfileImageContainer } from './styled'
import { HeaderProps } from './types'

const JobCardHeader = (prop: HeaderProps) => {
  const { castingImage, companyName, title, status } = prop
  const { user } = useUser()
  const router = useRouter()
  const { jobId } = router.query

  return (
    <HeaderRow>
      <ProfileImageContainer>
        <img src={castingImage} alt="casting pic" width="100%" height="100%" />
      </ProfileImageContainer>
      <div>
        <Typography variant="h6">{title}</Typography>
        <Typography fontWeight={400}>{companyName}</Typography>
      </div>
      {user?.type === UserType.ACTOR && (
        <Tooltip title="Report job">
          <ReportOutlined
            fontSize="small"
            color="error"
            style={{ cursor: 'pointer', marginLeft: 'auto' }}
            onClick={() => router.push('/report/' + jobId)}
          />
        </Tooltip>
      )}
      {user?.type === UserType.CASTING && status === JobStatus.OPEN && (
        <Tooltip title="Edit job">
          <EditOutlined
            fontSize="small"
            color="primary"
            style={{ cursor: 'pointer', marginLeft: 'auto' }}
            onClick={() => router.push('/job/' + jobId + '/edit')}
          />
        </Tooltip>
      )}
    </HeaderRow>
  )
}
export default JobCardHeader
