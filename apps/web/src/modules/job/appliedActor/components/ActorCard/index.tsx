import { ApplicationStatus } from '@modela/dtos'
import { FileDownloadOutlined } from '@mui/icons-material'
import { Divider, Typography } from '@mui/material'
import Modal from 'common/components/Modal'
import Link from 'next/link'
import React from 'react'

import ActorCardAction from '../ActorCardAction'
import ActorCardHeader from '../ActorCardHeader'
import ActorCardModal from '../ActorCardModal'
import useActorCardAction from '../ActorCardModal/hooks/useActorCardAction'
import { CardContainer, ResumeDownloadButton } from './styled'
import { ActorCardProps } from './types'

const ActorCard = (props: ActorCardProps) => {
  const { actorId, status, description, resumeUrl, ...headerProps } = props
  const { open, close, isOpen, isRejected, setIsRejected } =
    useActorCardAction()
  return (
    <>
      <Link
        passHref
        href={`/profile/${actorId}`}
        style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
      >
        <CardContainer variant="outlined">
          <ActorCardHeader {...headerProps} actorId={actorId} status={status} />

          <Typography variant="subtitle2" color="#00000099">
            {description}
          </Typography>
          <ResumeDownloadButton
            target="_blank"
            rel="noopener"
            href={resumeUrl}
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
              <ActorCardAction
                actorId={actorId}
                openModal={open}
                setIsRejected={setIsRejected}
              />
            </>
          )}
        </CardContainer>
      </Link>
      <Modal open={isOpen}>
        <ActorCardModal
          close={close}
          actorId={actorId}
          isRejected={isRejected}
        />
      </Modal>
    </>
  )
}

export default ActorCard
