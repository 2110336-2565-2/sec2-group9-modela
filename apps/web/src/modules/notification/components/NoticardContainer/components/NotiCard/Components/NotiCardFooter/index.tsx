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

  return (
    <FooterContainer>
      {appStatus === ApplicationStatus.OFFER_ACCEPTED ||
      appStatus === ApplicationStatus.OFFER_REJECTED ? (
        <Typography variant="subtitle2" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
          คุณได้
          {appStatus === ApplicationStatus.OFFER_ACCEPTED ? 'ตอบรับ' : 'ปฏิเสธ'}
          ข้อเสนอนี้ไปแล้ว
        </Typography>
      ) : (
        <>
          <Button
            sx={{
              color: '#AA5B5B',
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
            sx={{
              color: '#66A373',
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
        </>
      )}
    </FooterContainer>
  )
}

export default NotiCardFooter
