import { UserType } from '@modela/dtos'
import { FileDownloadOutlined } from '@mui/icons-material'
import { Divider, Typography } from '@mui/material'
import React from 'react'

import PendingUserCardFooter from './PendingUserCardFooter'
import PendingUserCardHeader from './PendingUserCardHeader'
import { CardContainer, ResumeDownloadButton } from './styled'
import { PendingUserCardProps } from './type'

const PendingUserCard = (props: PendingUserCardProps) => {
  const { data: pendingData, ...footerProps } = props
  const { data, type } = pendingData
  const { companyId, employmentCertUrl, idCardImageUrl, ssn, userId } = data

  const usingUrl =
    type === UserType.CASTING ? employmentCertUrl : idCardImageUrl
  return (
    <CardContainer variant="outlined">
      <PendingUserCardHeader data={data} type={type} />
      {type === UserType.CASTING ? (
        <Typography variant="subtitle2" color="#00000099">
          เลขจดทะเบียน: {companyId}
        </Typography>
      ) : (
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
        {type === UserType.CASTING ? (
          <Typography variant="button" color="primary">
            หนังสือรับรองการทำงาน
          </Typography>
        ) : (
          <Typography variant="button" color="primary">
            รูปถ่ายบัตรประชาชน/พาสปอร์ต
          </Typography>
        )}
      </ResumeDownloadButton>
      <Divider sx={{ margin: '-8px 0' }} />
      <PendingUserCardFooter userId={userId} {...footerProps} />
    </CardContainer>
  )
}

export default PendingUserCard
