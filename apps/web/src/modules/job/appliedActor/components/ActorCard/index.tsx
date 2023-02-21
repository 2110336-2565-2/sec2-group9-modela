import { ActorDto } from '@modela/dtos'
import { FileDownloadOutlined } from '@mui/icons-material'
import { Divider, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

import ActorCardAction from '../ActorCardAction'
import ActorCardHeader from '../ActorCardHeader'
import { CardContainer, ResumeDownloadButton } from './styled'

const ActorCard = (props: ActorDto) => {
  const { actorId, ...headerProps } = props
  return (
    <Link
      passHref
      href={`/profile/${actorId}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <CardContainer variant="outlined">
        <ActorCardHeader {...headerProps} actorId={actorId} />

        <Typography variant="subtitle2" color="#00000099">
          คำอธิบายสั้นๆ เกี่ยวกับตัวฉัน
        </Typography>
        <ResumeDownloadButton
          target="_blank"
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
        <Divider sx={{ margin: '-8px 0' }} />
        <ActorCardAction />
      </CardContainer>
    </Link>
  )
}

export default ActorCard
