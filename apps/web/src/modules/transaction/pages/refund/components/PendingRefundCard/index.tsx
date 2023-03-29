import { JobStatus } from '@modela/database'
import { FileDownloadOutlined } from '@mui/icons-material'
import { Button, Divider, Typography } from '@mui/material'
import JobCardHeader from 'modules/job/components/JobCardHeader'
import Link from 'next/link'

import { ActionContainer, CardContainer, ContentContainer } from './styled'
import { PendingRefundCardProps } from './types'

const PendingRefundCard = (props: PendingRefundCardProps) => {
  const {
    title,
    reason,
    wage,
    actor: {
      actorId,
      firstName: actorFirstName,
      lastName: actorLastName,
      middleName: actorMiddleName,
    },
    casting: {
      bankAccount,
      bankName,
      castingId,
      companyName,
      firstName: castingFirstName,
      lastName: castingLastName,
      middleName: castingMiddleName,
      profileImageUrl,
    },
    jobId,
    proofUrl,
    handleClickFinish,
    handleClickReject,
  } = props

  const castingName = `${castingFirstName} ${
    castingMiddleName || ''
  } ${castingLastName}`
  const actorName = `${actorFirstName} ${
    actorMiddleName || ''
  } ${actorLastName}`

  return (
    <CardContainer>
      <JobCardHeader
        title={castingName}
        companyName={companyName}
        jobCastingImageUrl={profileImageUrl}
        status={JobStatus.SELECTION_ENDED}
        jobId={jobId}
        castingId={castingId}
        castingName={castingName}
      />
      <ContentContainer>
        <Typography variant="body1">
          งาน:
          <Link
            href={`/job/${jobId}`}
            style={{
              textDecoration: 'none',
            }}
          >
            <Typography
              component="span"
              sx={{ marginLeft: '4px' }}
              color="primary"
            >
              {title}
            </Typography>
          </Link>
        </Typography>
        <Typography variant="body1">
          นักแสดงที่ขอเงินคืน:
          <Link
            href={`/profile/${actorId}`}
            style={{
              textDecoration: 'none',
            }}
          >
            <Typography
              component="span"
              sx={{ marginLeft: '4px' }}
              color="primary"
            >
              {actorName}
            </Typography>
          </Link>
        </Typography>
        <Typography variant="body1">เหตุผลที่ขอเงินคืน: {reason}</Typography>
        <div>
          <Typography variant="body1">จำนวนเงินที่ต้องจ่าย: {wage}</Typography>
          <Typography variant="body1">ธนาคาร: {bankName}</Typography>
          <Typography variant="body1">เลขบัญชี: {bankAccount}</Typography>
        </div>
        <Link
          href={proofUrl}
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <FileDownloadOutlined color="primary" />
          <Typography variant="button" color="primary">
            รูปถ่ายหลักฐานการขอเงินคืน
          </Typography>
        </Link>
      </ContentContainer>
      <Divider sx={{ width: '100%' }} />
      <ActionContainer>
        <Button
          onClick={() => handleClickReject(jobId, actorId)}
          sx={{ borderRadius: '12px', padding: '4px' }}
          color="error"
        >
          ไม่อนุมัติ
        </Button>
        <Button
          onClick={() => handleClickFinish(jobId, actorId)}
          sx={{ borderRadius: '12px', padding: '4px' }}
          color="success"
        >
          อนุมัติ
        </Button>
      </ActionContainer>
    </CardContainer>
  )
}

export default PendingRefundCard
