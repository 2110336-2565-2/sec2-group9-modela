import { ReportOutlined } from '@mui/icons-material'
import { Tooltip, Typography } from '@mui/material'
import { useUser } from 'common/context/UserContext'
import React from 'react'

import { HeaderRow, ProfileImageContainer } from './styled'
import { HeaderProps } from './type'

const JobCardHeader = (prop: HeaderProps) => {
  const { castingImage, companyName, title } = prop
  const user = useUser()

  const report = () => {
    window.alert('reported')
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
      {user?.type === 'ACTOR' && (
        <Tooltip title="Report job">
          <ReportOutlined
            fontSize="small"
            color="error"
            style={{ cursor: 'pointer', marginLeft: 'auto' }}
            onClick={() => report()}
          />
        </Tooltip>
      )}
    </HeaderRow>
  )
}
export default JobCardHeader
