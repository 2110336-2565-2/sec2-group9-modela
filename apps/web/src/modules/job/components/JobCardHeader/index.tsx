import { ApplicationStatus, JobStatus, UserType } from '@modela/dtos'
import {
  AttachMoneyOutlined,
  EditOutlined,
  MoneyOffOutlined,
  ReportOutlined,
} from '@mui/icons-material'
import { Chip, IconButton, Tooltip, Typography } from '@mui/material'
import ProfileImage from 'common/components/ProfileImage'
import { useUser } from 'common/context/UserContext'
import Link from 'next/link'
import React from 'react'

import ApplicationStatusChip from './components/applicationStatusChip'
import { HeaderRow, TitleContainer } from './styled'
import { HeaderProps } from './types'

const JobCardHeader = (props: HeaderProps) => {
  const {
    jobCastingImageUrl,
    companyName,
    title,
    status,
    jobId,
    isDetail,
    castingId,
    castingName,
    isReport,
    appliedStatus,
    isHistory,
    isPaid,
  } = props
  const { user } = useUser()

  return (
    <HeaderRow>
      <Link
        href={`/profile/${castingId}`}
        passHref
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <ProfileImage
          src={jobCastingImageUrl}
          firstName={castingName}
          userId={castingId}
          sx={{ marginTop: '4px' }}
        />
      </Link>
      <TitleContainer>
        <Typography variant="h6" sx={{ wordBreak: 'break-word' }}>
          {!isDetail &&
            `${title.substring(0, 50)}${title.length >= 50 ? '...' : ''}`}
          {isDetail && title}
        </Typography>
        <Typography fontWeight={400} sx={{ wordBreak: 'break-word' }}>
          {companyName}
        </Typography>
      </TitleContainer>
      {user?.type === UserType.ACTOR && !appliedStatus && !isHistory && (
        <Tooltip title="Report job">
          <IconButton
            href={`/report/${jobId}`}
            onClick={(ev) => ev.stopPropagation()}
          >
            <ReportOutlined fontSize="small" color="error" />
          </IconButton>
        </Tooltip>
      )}
      {user?.type === UserType.ACTOR &&
        status === JobStatus.SELECTION_ENDED &&
        appliedStatus === ApplicationStatus.OFFER_ACCEPTED && (
          <div style={{ paddingTop: '5px' }}>
            {isPaid ? (
              <Tooltip title="Job is paid">
                <AttachMoneyOutlined fontSize="small" color="success" />
              </Tooltip>
            ) : (
              <Tooltip title="Job is unpaid">
                <MoneyOffOutlined fontSize="small" color="error" />
              </Tooltip>
            )}
          </div>
        )}
      {appliedStatus && (
        <ApplicationStatusChip applicationStatus={appliedStatus} />
      )}
      {user?.type === UserType.CASTING &&
        status === JobStatus.SELECTION_ENDED && (
          <div style={{ padding: '8px' }}>
            {isPaid ? (
              <Tooltip title="Job is paid">
                <AttachMoneyOutlined fontSize="small" color="success" />
              </Tooltip>
            ) : (
              <Tooltip title="Job is unpaid">
                <MoneyOffOutlined fontSize="small" color="error" />
              </Tooltip>
            )}
          </div>
        )}
      {user?.type === UserType.CASTING && status === JobStatus.OPEN && (
        <Tooltip title="Edit job">
          <IconButton
            href={`/job/${jobId}/edit`}
            onClick={(ev) => ev.stopPropagation()}
          >
            <EditOutlined fontSize="small" color="primary" />
          </IconButton>
        </Tooltip>
      )}
      {user?.type === UserType.ADMIN && isReport && (
        <Chip
          label="ถูกแจ้งปัญหา"
          sx={{ color: '#AA5B5B', background: 'rgba(170, 91, 91, 0.2)' }}
        />
      )}
    </HeaderRow>
  )
}
export default JobCardHeader
