import { UserType } from '@modela/dtos'
import { EditOutlined, ReportOutlined } from '@mui/icons-material'
import { Tooltip, Typography } from '@mui/material'
import { useUser } from 'common/context/UserContext'
import React from 'react'

import { HeaderRow, ProfileImageContainer } from './styled'
import { HeaderProps } from './types'

const JobCardHeader = (prop: HeaderProps) => {
  const { castingImage, companyName, title } = prop
  const user = useUser()

  const report = () => {
    window.alert('reported')
  }
  const edit = () => {
    window.alert('edited')
  }

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
            onClick={() => report()}
          />
        </Tooltip>
      )}
      {user?.type === UserType.CASTING && (
        <Tooltip title="Edit job">
          <EditOutlined
            fontSize="small"
            color="primary"
            style={{ cursor: 'pointer', marginLeft: 'auto' }}
            onClick={() => edit()}
          />
        </Tooltip>
      )}
    </HeaderRow>
  )
}
export default JobCardHeader