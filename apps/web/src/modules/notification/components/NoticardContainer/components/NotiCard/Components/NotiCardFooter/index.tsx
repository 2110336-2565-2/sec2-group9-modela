import { Button } from '@mui/material'
import React from 'react'

import { FooterContainer } from './styled'
import { FooterProps } from './types'

const NotiCardFooter = (props: FooterProps) => {
  const { jobId } = props
  return (
    <FooterContainer key={jobId}>
      <Button
        sx={{
          color: '#AA5B5B',
          cursor: 'pointer',
          marginRight: 'auto',
          width: 'fit-content',
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
      >
        ยอมรับข้อเสนอ
      </Button>
    </FooterContainer>
  )
}

export default NotiCardFooter
