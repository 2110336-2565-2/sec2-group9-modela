import { FileDownloadOutlined } from '@mui/icons-material'
import { Button, Divider, Typography } from '@mui/material'
import BaseHeader from 'common/components/JobCard/JobCardHeader/BaseHeader'
import Link from 'next/link'

import { ActionContainer, CardContainer, ContentContainer } from './styled'
import { PendingCastingCardProps } from './types'

const PendingCastingCard = (props: PendingCastingCardProps) => {
  const {
    title,
    firstName,
    middleName,
    lastName,
    jobId,
    proofUrl,
    amount,
    bankName,
    bankAccount,
    castingId,
    companyName,
    handleClickFinish,
    handleClickReject,
    profileImageUrl,
  } = props
  const castingName = `${firstName} ${middleName || ''} ${lastName}`

  return (
    <CardContainer>
      <BaseHeader
        title={castingName}
        companyName={companyName}
        jobCastingImageUrl={profileImageUrl}
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
        <div>
          <Typography variant="body1">
            จำนวนเงินที่ต้องจ่าย: {amount}
          </Typography>
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
            รูปถ่ายหลักฐานธุรกรรม
          </Typography>
        </Link>
      </ContentContainer>
      <Divider sx={{ width: '100%' }} />
      <ActionContainer>
        <Button
          onClick={() => handleClickReject(jobId, castingId)}
          sx={{ borderRadius: '12px', padding: '4px' }}
          color="reject"
        >
          ไม่อนุมัติ
        </Button>
        <Button
          onClick={() => handleClickFinish(jobId, castingId)}
          sx={{ borderRadius: '12px', padding: '4px' }}
          color="success"
        >
          เสร็จสิ้น
        </Button>
      </ActionContainer>
    </CardContainer>
  )
}

export default PendingCastingCard
