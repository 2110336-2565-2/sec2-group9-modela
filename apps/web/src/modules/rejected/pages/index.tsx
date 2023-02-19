import { UserType } from '@modela/database'
import { CircularProgress, Divider, Typography } from '@mui/material'
import { useUser } from 'common/context/UserContext'
import withRejectedGuard from 'common/hoc/withRejectedGuard'
import React from 'react'

import EditActorInfoForm from '../actor'
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
          <Typography variant="subtitle1" color="#0000009A">
            เหตุผล: {initialData.reason}
          </Typography>
          <Typography variant="subtitle1">
            กรุณาแก้ไขข้อมูลและส่งให้แอดมินตรวจสอบอีกครั้ง
          </Typography>
          <Divider sx={{ width: '100%' }} />
        </FormHeader>
        {type === UserType.ACTOR ? (
          <EditActorInfoForm initialData={initialData.data} />
        ) : (
          <></>
        )}
      </FormContainer>
    </RootContainer>
  )
}

export default withRejectedGuard(RejectedPage)
