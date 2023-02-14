import { JobStatus, UserType } from '@modela/dtos'
import { EditOutlined, ReportOutlined } from '@mui/icons-material'
import { Tooltip, Typography } from '@mui/material'
import { useUser } from 'common/context/UserContext'
import Link from 'next/link'
import React from 'react'

import { HeaderRow, ProfileImageContainer } from './styled'
import { HeaderProps } from './types'

const JobCardHeader = (prop: HeaderProps) => {
  const { castingImage, companyName, title, status, jobId } = prop
  const { user } = useUser()

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
          <Link
            href={`/report/${jobId}`}
            passHref
            style={{ cursor: 'pointer', marginLeft: 'auto' }}
          >
            <ReportOutlined fontSize="small" color="error" />
          </Link>
        </Tooltip>
      )}
      {user?.type === UserType.CASTING && status === JobStatus.OPEN && (
        <Tooltip title="Edit job">
          <Link
            href={`/job/${jobId}/edit`}
            passHref
            style={{ cursor: 'pointer', marginLeft: 'auto' }}
          >
            <EditOutlined fontSize="small" color="primary" />
          </Link>
        </Tooltip>
      )}
    </HeaderRow>
  )
}
export default JobCardHeader
