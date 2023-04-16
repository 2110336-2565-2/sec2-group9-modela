import { Edit } from '@mui/icons-material'
import { Button, Divider, Grid, Typography } from '@mui/material'
import ProfileImage from 'common/components/ProfileImage'
import React from 'react'

import InfoText from '../InfoText'
import { ContentContainer, StyledRating, SubContentContainer } from './styled'
import { ProfileInfoProps } from './types'

export default function ActorProfileInfo(props: ProfileInfoProps) {
  const {
    firstName,
    middleName,
    lastName,
    profileImageUrl,
    userId,
    nickname,
    nationality,
    religion,
    phoneNumber,
    age,
    ethnicity,
    gender,
    height,
    weight,
    eyeColor,
    hairColor,
    bust,
    waist,
    hips,
    shoeSize,
    skinShade,
    description,
    isOwn,
    rating,
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
      {rating && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <StyledRating value={rating} precision={0.01} readOnly />
          <Typography variant="subtitle2" sx={{ paddingTop: '2px' }}>
            {rating.toPrecision(2)} คะแนน
          </Typography>
        </div>
      )}
      <ContentContainer>
        <SubContentContainer sx={{ width: '50%' }}>
          <InfoText main="ชื่อเล่น" info={nickname} />
          <InfoText main="สัญชาติ" info={nationality} />
          <InfoText main="ศาสนา" info={religion} />
          <InfoText main="เบอร์โทรศัพท์" info={phoneNumber} />
        </SubContentContainer>
        <SubContentContainer sx={{ width: '50%' }}>
          <InfoText main="อายุ" info={age?.toString()} />
          <InfoText main="เชื้อชาติ" info={ethnicity} />
          <InfoText main="เพศ" info={gender} />
        </SubContentContainer>
      </ContentContainer>
      <Divider sx={{ width: '100%' }} />
      <ContentContainer>
        <SubContentContainer sx={{ width: '100%' }}>
          <InfoText main="ความสูง" info={height?.toString()} />
          <InfoText main="น้ำหนัก" info={weight?.toString()} />
          <InfoText main="สีตา" info={eyeColor} />
          <InfoText main="สีผม" info={hairColor} />
          <InfoText main="รอบอก" info={bust?.toString()} />
          <InfoText main="รอบเอว" info={waist?.toString()} />
          <InfoText main="รอบสะโพก" info={hips?.toString()} />
          <InfoText main="ขนาดรองเท้า" info={shoeSize?.toString()} />
          <InfoText main="สีผิว" info={skinShade} />
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
