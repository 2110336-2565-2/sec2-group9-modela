import { ActorDto, ApplicationStatus } from '@modela/dtos'
import { FileDownloadOutlined } from '@mui/icons-material'
import { Divider, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

import ActorCardAction from '../ActorCardAction'
import ActorCardHeader from '../ActorCardHeader'
import { CardContainer, ResumeDownloadButton } from './styled'

const ActorCard = (props: ActorDto) => {
  const { actorId, status, ...headerProps } = props
  return (
    <Link
      passHref
      href={`/profile/${actorId}`}
      style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
    >
      <CardContainer variant="outlined">
        <ActorCardHeader {...headerProps} actorId={actorId} status={status} />

        <Typography variant="subtitle2" color="#00000099">
          คำอธิบายสั้นๆ เกี่ยวกับตัวฉัน
        </Typography>
        <ResumeDownloadButton
          target="_blank"
          rel="noopener"
          href="https://www.google.com"
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <FileDownloadOutlined color="primary" />
          <Typography variant="subtitle2" color="primary">
            เรซูเม่
          </Typography>
        </ResumeDownloadButton>
        {status === ApplicationStatus.PENDING && (
          <>
            <Divider sx={{ margin: '-8px 0' }} />
            <ActorCardAction />
          </>
        )}
      </CardContainer>
    </Link>
  )
}

export default ActorCard
