import { Edit } from '@mui/icons-material'
import { Button, Divider, Grid, Typography } from '@mui/material'
import ProfileImage from 'common/components/ProfileImage'
import React from 'react'

import InfoText from '../InfoText'
import { ContentContainer, SubContentContainer } from './styled'
import { ProfileInfoProps } from './types'

export default function CastingProfileInfo(props: ProfileInfoProps) {
  const {
    firstName,
    middleName,
    lastName,
    profileImageUrl,
    userId,
    companyName,
    phoneNumber,
    description,
    isOwn,
  } = props
  return (
    <>
      <Typography variant="h5">
        {firstName + ' ' + middleName + ' ' + lastName}
      </Typography>
      <Divider sx={{ width: '100%' }} />
      <Grid item width="100%">
        <ProfileImage
          src={profileImageUrl}
          userId={userId!}
          firstName={firstName!}
          sx={{
            margin: 'auto',
            width: '300px',
            height: '300px',
            borderRadius: '10%',
          }}
        />
      </Grid>
      <ContentContainer>
        <SubContentContainer sx={{ width: '100%' }}>
          <InfoText main="ชื่อบริษัท" info={companyName} />
          <InfoText main="เบอร์โทรศัพท์" info={phoneNumber} />
        </SubContentContainer>
      </ContentContainer>
      <ContentContainer>
        <SubContentContainer sx={{ width: '100%' }}>
          <InfoText main="ข้อมูลอื่นๆ เพิ่มเติม" info={description} />
        </SubContentContainer>
      </ContentContainer>
      {isOwn && (
        <Button
          href="/profile/edit"
          variant="contained"
          sx={{
            borderRadius: '12px',
            width: 'fit-content',
            maxWidth: '250px',
            marginLeft: '1rem',
            fontSize: '16px',
          }}
          startIcon={<Edit />}
        >
          แก้ไขข้อมูล
        </Button>
      )}
    </>
  )
}
