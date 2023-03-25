import { UserType } from '@modela/dtos'
import { Button, Typography } from '@mui/material'
import FormController from 'common/components/FormController'
import Modal from 'common/components/Modal'
import UploadFile from 'common/components/UploadFile'
import withGuard from 'common/hoc/withGuard'
import Link from 'next/link'
import { useRouter } from 'next/router'

import SendResultModalBody from '../../components/SendResultModalBody'
import useSendingDetails from './hooks/useSendingDetails'
import {
  ActionContainer,
  DetailsContainer,
  SendProofContainer,
  TitleContainer,
} from './styled'

const SendProofOfTransactionPage = () => {
  const router = useRouter()
  const { jobId } = router.query

  const { job, error, fileUrl, isModalOpen, handleSubmit, handleUploadFile } =
    useSendingDetails(jobId as string)

  return (
    <>
      <SendProofContainer onSubmit={handleSubmit(false)}>
        <TitleContainer>
          <FormController type="title" label="ส่งหลักฐานธุรกรรม" />
          <FormController type="divider" />
          <DetailsContainer>
            <Typography variant="body1" sx={{ display: 'flex', gap: '6px' }}>
              งาน:{' '}
              <Typography variant="body1" color="primary">
                <Link
                  href={`/job/${jobId}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {job.title}
                </Link>
              </Typography>
            </Typography>
            <div style={{ marginTop: '12px' }}>
              <Typography variant="body1">
                จำนวนเงินที่ต้องจ่าย: {job.amount}
              </Typography>
              <Typography variant="body1">ธนาคาร: {job.bankName}</Typography>
              <Typography variant="body1">
                เลขบัญชี: {job.bankAccount}
              </Typography>
            </div>
          </DetailsContainer>
        </TitleContainer>
        <UploadFile
          label="อัปโหลดรูปถ่ายหลักฐานธุรกรรม"
          url={fileUrl}
          handleSelectFile={handleUploadFile}
          error={!!error}
          errorMessage={error}
        />
        <ActionContainer>
          <Link
            href={`/job/${jobId}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Button
              variant="contained"
              color="error"
              sx={{ borderRadius: '12px' }}
            >
              ยกเลิก
            </Button>
          </Link>
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ borderRadius: '12px' }}
          >
            ยืนยัน
          </Button>
        </ActionContainer>
      </SendProofContainer>
      <Modal open={isModalOpen} contentSx={{ maxWidth: '500px' }}>
        <SendResultModalBody jobId={jobId as string} />
      </Modal>
    </>
  )
}

export default withGuard(SendProofOfTransactionPage, 'verified', [
  UserType.CASTING,
])
