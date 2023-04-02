import { JobStatus } from '@modela/dtos'
import { Divider, Typography } from '@mui/material'
import Modal from 'common/components/Modal'
import useSwitch from 'common/hooks/useSwitch'
import Footer from 'modules/job/components/JobCardFooter'
import Header from 'modules/job/components/JobCardHeader'
import Link from 'next/link'
import React from 'react'

import CancelAppliedModal from '../CancelAppliedModal'
import { CardContainer } from './styled'
import { GetAppliedJobDtoWithModalInfo } from './types'

export default function JobCard(prop: GetAppliedJobDtoWithModalInfo) {
  const {
    actorCount,
    description,
    applicationDeadline,
    gender,
    wage,
    jobId,
    status,
    appliedStatus,
    openAcceptModal,
    openRejectModal,
    setFocusId,
    setTitle,
    ...headerProps
  } = prop

  const { isOpen, close, open } = useSwitch()

  return (
    <>
      <Link
        href={`/job/${jobId}`}
        passHref
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <CardContainer
          sx={{
            backgroundColor:
              status === JobStatus.CANCELLED ? 'rgba(33, 33, 33, 0.08)' : '',
          }}
        >
          <Header
            status={status}
            jobId={jobId}
            appliedStatus={appliedStatus}
            {...headerProps}
          />
          <Typography
            variant="subtitle2"
            sx={{
              color: 'rgba(0,0,0,0.6)',
              paddingBottom: '12px',
              wordBreak: 'break-word',
            }}
          >
            {`${description.substring(0, 200)}${
              description.length >= 200 ? '...' : ''
            }`}
          </Typography>

          <Divider variant="fullWidth" sx={{ width: '100%' }} />
          <Footer
            dueDate={applicationDeadline}
            gender={gender}
            wage={wage}
            actorCount={actorCount}
            status={status}
            isApplied={true}
            appliedStatus={appliedStatus}
            openModal={open}
            jobId={jobId}
            jobTitle={headerProps.title}
            openAcceptModal={openAcceptModal}
            openRejectModal={openRejectModal}
            setFocusId={setFocusId}
            setTitle={setTitle}
          />
        </CardContainer>
      </Link>
      <Modal open={isOpen}>
        <CancelAppliedModal jobId={jobId} close={close} />
      </Modal>
    </>
  )
}
