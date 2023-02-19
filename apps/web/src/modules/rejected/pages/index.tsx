import { Divider, Typography } from '@mui/material'
import React from 'react'

import EditActorInfoForm from '../actor'
import { FormContainer, FormHeader, RootContainer } from './styled'

const RejectedPage = () => {
  return (
    <RootContainer>
      <FormContainer variant="outlined">
        <FormHeader>
          <Typography variant="h5">การสมัครสมาชิกถูกปฎิเสธ</Typography>
          <Divider sx={{ width: '100%' }} />
          <Typography variant="subtitle1" color="#0000009A">
            เหตุผล: เลขบัตรประจำตัวประชาชนไม่ตรงกับภาพที่ถ่าย
          </Typography>
          <Typography variant="subtitle1">
            กรุณาแก้ไขข้อมูลและส่งให้แอดมินตรวจสอบอีกครั้ง
          </Typography>
          <Divider sx={{ width: '100%' }} />
        </FormHeader>
        <EditActorInfoForm />
      </FormContainer>
    </RootContainer>
  )
}

export default RejectedPage
