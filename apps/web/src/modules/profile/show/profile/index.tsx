import { UserType } from '@modela/dtos'
import { CircularProgress, Divider, Grid, Typography } from '@mui/material'
import ProfileImage from 'common/components/ProfileImage'
import { useUser } from 'common/context/UserContext'
import withGuard from 'common/hoc/withGuard'
import React from 'react'

import InfoText from '../components/InfoText'
import useActorProfile from './hooks/useActorProfile'
import {
  CardContainer,
  ContentContainer,
  RootContainer,
  SubContentContainer,
} from './styled'

const ViewActorProfile = () => {
  const { profile, isOpen } = useActorProfile()
  const { user } = useUser()
  return (
    <RootContainer>
      <CardContainer variant="outlined">
        {isOpen ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h5">
              {user?.firstName + ' ' + user?.middleName + ' ' + user?.lastName}
            </Typography>
            <Divider sx={{ width: '100%' }} />
            <Grid item width="100%">
              <ProfileImage
                src={profile?.profileImageUrl}
                userId={user!.userId}
                firstName={user!.firstName}
                sx={{
                  margin: 'auto',
                  width: '300px',
                  height: '300px',
                  borderRadius: '10%',
                }}
              />
            </Grid>
            <ContentContainer>
              <SubContentContainer sx={{ width: '50%' }}>
                <InfoText main="ชื่อเล่น" info={profile?.nickname} />
                <InfoText main="สัญชาติ" info={profile?.nationality} />
                <InfoText main="ศาสนา" info={profile?.religion} />
                <InfoText
                  main="เบอร์โทรศัพท์"
                  info={profile?.phoneNumber}
                  isBlack={true}
                />
              </SubContentContainer>
              <SubContentContainer sx={{ width: '50%' }}>
                <InfoText main="อายุ" info={profile?.age?.toString()} />
                <InfoText main="เชื้อชาติ" info={profile?.ethnicity} />
                <InfoText main="เพศ" info={profile?.gender} />
              </SubContentContainer>
            </ContentContainer>
            <Divider sx={{ width: '100%' }} />
            <ContentContainer>
              <SubContentContainer sx={{ width: '100%' }}>
                <InfoText main="ความสูง" info={profile?.height?.toString()} />
                <InfoText main="น้ำหนัก" info={profile?.weight?.toString()} />
                <InfoText main="สีตา" info={profile?.eyeColor} />
                <InfoText main="สีผม" info={profile?.hairColor} />
                <InfoText main="รอบอก" info={profile?.bust?.toString()} />
                <InfoText main="รอบเอว" info={profile?.waist?.toString()} />
                <InfoText main="รอบสะโพก" info={profile?.hips?.toString()} />
                <InfoText
                  main="ขนาดรองเท้า"
                  info={profile?.shoeSize?.toString()}
                />
                <InfoText main="สีผิว" info={profile?.skinShade} />
              </SubContentContainer>
            </ContentContainer>
            <ContentContainer>
              <SubContentContainer sx={{ width: '100%' }}>
                <InfoText
                  main="ข้อมูลอื่นๆ เพิ่มเติม"
                  info={profile?.description}
                />
              </SubContentContainer>
            </ContentContainer>
          </>
        )}
      </CardContainer>
    </RootContainer>
  )
}

export default withGuard(ViewActorProfile, 'verified', [UserType.CASTING])
