import { PendingUserDto } from '@modela/dtos'
import { FileDownloadOutlined } from '@mui/icons-material'
import { Divider, Typography } from '@mui/material'
import React from 'react'

import PendingUserCardFooter from '../Footer'
import PendingUserCardHeader from '../Header'
import { CardContainer, ResumeDownloadButton } from './styled'

const PendingUserCard = (props: PendingUserDto) => {
  const { companyId, employmentCertUrl, idCardImageUrl, ssn, userId } =
    props.data
  const usingUrl = props.type === 'CASTING' ? employmentCertUrl : idCardImageUrl
  return (
    <CardContainer variant="outlined">
      <PendingUserCardHeader data={props.data} type={props.type} />
      {props.type === 'CASTING' && (
        <Typography variant="subtitle2" color="#00000099">
          เลขจดทะเบียน: {companyId}
        </Typography>
      )}
      {props.type === 'ACTOR' && (
        <Typography variant="subtitle2" color="#00000099">
          เลขบัตรประจำตัวประชาชน/เลขพาสปอร์ต: {ssn}
        </Typography>
      )}
      <ResumeDownloadButton
        target="_blank"
        rel="noopener"
        href={usingUrl}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <FileDownloadOutlined color="primary" />
        {props.type === 'CASTING' && (
          <Typography variant="button" color="primary">
            หนังสือรับรองการทำงาน
          </Typography>
        )}
        {props.type === 'ACTOR' && (
          <Typography variant="button" color="primary">
            รูปถ่ายบัตรประชาชน/พาสปอร์ต
          </Typography>
        )}
      </ResumeDownloadButton>
      <>
        <Divider sx={{ margin: '-8px 0' }} />
        <PendingUserCardFooter userId={userId} />
      </>
    </CardContainer>
  )
}

export default PendingUserCard
