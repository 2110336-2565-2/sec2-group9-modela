import { ApplicationStatus, JobStatus } from '@modela/dtos'
import { Divider, Typography } from '@mui/material'
import Modal from 'common/components/Modal'
import Link from 'next/link'
import React from 'react'

import ActorCardAction from '../ActorCardAction'
import ActorCardHeader from '../ActorCardHeader'
import ActorCardModal from '../ActorCardModal'
import useActorCardAction from '../ActorCardModal/hooks/useActorCardAction'
import ActorCardReview from '../ActorCardReview'
import ResumeDownloadButton from '../ResumeDownloadButton'
import { CardContainer } from './styled'
import { ActorCardProps } from './types'

const ActorCard = (props: ActorCardProps) => {
  const {
    actorId,
    status,
    description,
    resumeUrl,
    jobStatus,
    rating,
    ...headerProps
  } = props
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
          <ActorCardHeader
            {...headerProps}
            jobStatus={jobStatus}
            actorId={actorId}
            status={status}
          />

          <Typography variant="subtitle2" color="#00000099">
            {description}
          </Typography>

          {jobStatus === JobStatus.FINISHED &&
            status === ApplicationStatus.OFFER_ACCEPTED && (
              <ActorCardReview rating={rating} actorId={actorId} />
            )}

          {jobStatus !== JobStatus.FINISHED && (
            <ResumeDownloadButton resumeUrl={resumeUrl} />
          )}

          {status === ApplicationStatus.PENDING &&
            jobStatus === JobStatus.SELECTING && (
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
