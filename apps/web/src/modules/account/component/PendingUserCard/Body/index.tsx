import { FileDownloadOutlined } from '@mui/icons-material'
import { Divider, Typography } from '@mui/material'
import React from 'react'

import PendingUserCardFooter from '../Footer'
import PendingUserCardHeader from '../Header'
import { CardContainer, ResumeDownloadButton } from './styled'
import { cardProps } from './type'

const PendingUserCard = (props: cardProps) => {
  const { companyId, employmentCertUrl, idCardImageUrl, ssn, userId } =
    props.data.data
  const usingUrl =
    props.data.type === 'CASTING' ? employmentCertUrl : idCardImageUrl
  return (
    <CardContainer variant="outlined">
      <PendingUserCardHeader data={props.data.data} type={props.data.type} />
      {props.data.type === 'CASTING' && (
        <Typography variant="subtitle2" color="#00000099">
          เลขจดทะเบียน: {companyId}
        </Typography>
      )}
      {props.data.type === 'ACTOR' && (
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
        {props.data.type === 'CASTING' && (
          <Typography variant="button" color="primary">
            หนังสือรับรองการทำงาน
          </Typography>
        )}
        {props.data.type === 'ACTOR' && (
          <Typography variant="button" color="primary">
            รูปถ่ายบัตรประชาชน/พาสปอร์ต
          </Typography>
        )}
      </ResumeDownloadButton>
      <>
        <Divider sx={{ margin: '-8px 0' }} />
        <PendingUserCardFooter
          userId={userId}
          setReason={props.setReason}
          setId={props.setId}
          accept={props.accept}
          reject={props.reject}
        />
      </>
    </CardContainer>
  )
}

export default PendingUserCard
