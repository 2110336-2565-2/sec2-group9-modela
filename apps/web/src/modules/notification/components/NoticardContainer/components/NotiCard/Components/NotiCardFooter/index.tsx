import { ApplicationStatus } from '@modela/dtos'
import { Button, Typography } from '@mui/material'
import React from 'react'

import { FooterContainer } from './styled'
import { FooterProps } from './types'

const NotiCardFooter = (props: FooterProps) => {
  const {
    jobId,
    openAcceptModal,
    openRejectModal,
    setFocusId,
    setTitle,
    jobTitle,
    appStatus,
  } = props
  const setFocustedNotiHandle = () => {
    if (jobTitle) {
      setTitle(jobTitle)
    }
    if (jobId) {
      setFocusId(jobId)
    }
  }
  const rejectOnclikcHandle = () => {
    setFocustedNotiHandle()
    openRejectModal()
  }
  const acceptOnclickHandle = () => {
    setFocustedNotiHandle()
    openAcceptModal()
  }

  if (appStatus === ApplicationStatus.OFFER_ACCEPTED)
    return (
      <FooterContainer>
        <Typography variant="subtitle2" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
          คุณได้ตอบรับข้อเสนอนี้ไปแล้ว
        </Typography>
      </FooterContainer>
    )

  if (appStatus === ApplicationStatus.OFFER_REJECTED)
    return (
      <FooterContainer>
        <Typography variant="subtitle2" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
          คุณได้ปฏิเสธข้อเสนอนี้ไปแล้ว
        </Typography>
      </FooterContainer>
    )

  if (appStatus === ApplicationStatus.OFFER_SENT)
    return (
      <FooterContainer>
        <Button
          color="reject"
          sx={{
            cursor: 'pointer',
            marginRight: 'auto',
            width: 'fit-content',
          }}
          onClick={() => {
            rejectOnclikcHandle()
          }}
        >
          ปฏิเสธข้อเสนอ
        </Button>
        <Button
          color="success"
          sx={{
            cursor: 'pointer',
            marginLeft: 'auto',
            width: 'fit-content',
          }}
          onClick={() => {
            acceptOnclickHandle()
          }}
        >
          ยอมรับข้อเสนอ
        </Button>
      </FooterContainer>
    )

  return (
    <FooterContainer>
      <Typography variant="subtitle2" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
        คุณไม่ได้ตอบรับข้อเสนอนี้
      </Typography>
    </FooterContainer>
  )
}

export default NotiCardFooter
