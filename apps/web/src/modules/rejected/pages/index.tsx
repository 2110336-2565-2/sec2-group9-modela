import { ActorInfoDto, CastingInfoDto, UserType } from '@modela/dtos'
import { CircularProgress, Divider, Typography } from '@mui/material'
import { useUser } from 'common/context/UserContext'
import withGuard from 'common/hoc/withGuard'
import React from 'react'

import EditActorInfoForm from '../actor'
import EditCastingInfoForm from '../casting'
import useInitialData from './hooks/useInitialData'
import { FormContainer, FormHeader, RootContainer } from './styled'

const RejectedPage = () => {
  const { type } = useUser().user!
  const initialData = useInitialData(type)

  if (!initialData) return <CircularProgress sx={{ alignSelf: 'center' }} />

  return (
    <RootContainer>
      <FormContainer variant="outlined">
        <FormHeader>
          <Typography variant="h5">การสมัครสมาชิกถูกปฎิเสธ</Typography>
          <Divider sx={{ width: '100%' }} />
          <Typography
            variant="subtitle1"
            color="error"
            sx={{ textAlign: 'center' }}
          >
            เหตุผล: {initialData.rejectedReason}
          </Typography>
          <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
            กรุณาแก้ไขข้อมูลและส่งให้แอดมินตรวจสอบอีกครั้ง
          </Typography>
          <Divider sx={{ width: '100%' }} />
        </FormHeader>
        {type === UserType.ACTOR ? (
          <EditActorInfoForm initialData={initialData.data as ActorInfoDto} />
        ) : (
          <EditCastingInfoForm
            initialData={initialData.data as CastingInfoDto}
          />
        )}
      </FormContainer>
    </RootContainer>
  )
}

export default withGuard(RejectedPage, 'rejected')
