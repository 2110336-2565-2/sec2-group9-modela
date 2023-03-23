// import { UserType } from '@modela/dtos'
import { Button, Typography } from '@mui/material'
import FormController from 'common/components/FormController'
import UploadFile from 'common/components/UploadFile'
import Link from 'next/link'
// import withGuard from 'common/hoc/withGuard'
// import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import { DetailsContainer, SendProofContainer, TitleContainer } from './styled'

const SendProofOfTransactionPage = () => {
  const router = useRouter()
  const { jobId } = router.query

  // This will change to strict type later
  const [job, setJob] = useState<any>({})

  const handleFetchDetails = useCallback(async () => {
    setJob({
      title: 'hello world',
      jobId: 1,
      amount: 50000,
      bankName: 'Kasikorn Bank',
      bankAccount: '1234567890',
    })
    // try {
    //   const res = await apiClient.get(`credits/jobs/${jobId}`)
    // } catch (err) {}
    // if (res.status !== 200) {
    //   router.replace(`jobs/${jobId}`)
    //   return
    // }
  }, [])

  const handleUploadFile = () => {}

  useEffect(() => {
    handleFetchDetails()
  }, [handleFetchDetails])

  return (
    <SendProofContainer>
      <TitleContainer>
        <FormController type="title" label="ส่งหลักฐานธุรกรรม" />
        <FormController type="divider" />
        <DetailsContainer>
          <Typography variant="body1" sx={{ display: 'flex', gap: '6px' }}>
            งาน:{' '}
            <Typography variant="body1" color="primary">
              <Link
                href={`/jobs/${jobId}`}
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
            <Typography variant="body1">เลขบัญชี: {job.bankAccount}</Typography>
          </div>
        </DetailsContainer>
      </TitleContainer>
      <UploadFile
        label="อัปโหลดรูปถ่ายหลักฐานธุรกรรม"
        handleSelectFile={handleUploadFile}
        error={false}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="error" sx={{ borderRadius: '12px' }}>
          ยกเลิก
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{ borderRadius: '12px' }}
        >
          ยืนยัน
        </Button>
      </div>
    </SendProofContainer>
  )
}

export default SendProofOfTransactionPage
