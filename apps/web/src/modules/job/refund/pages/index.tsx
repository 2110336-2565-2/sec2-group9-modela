import { UserType } from '@modela/dtos'
import { Button, Grid, Modal, Typography } from '@mui/material'
import FormController from 'common/components/FormController'
import withGuard from 'common/hoc/withGuard'
import Link from 'next/link'
import { useRouter } from 'next/router'

import ResultModalBody from '../components/ResultModalBody'
import { RequestRefundContainer } from '../pages/styled'
import useRefundForm from './hooks/useRefundForm'

const RequestRefundPage = () => {
  const router = useRouter()
  const jobId = router.query.jobId || ''
  const actorId = router.query.actorId || ''

  const {
    control,
    refundDetails,
    handleUploadFile,
    handleSubmit,
    isModalOpen,
  } = useRefundForm(+jobId, +actorId)

  return (
    <>
      <RequestRefundContainer onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ padding: '12px' }}>
          <FormController type="title" label="ส่งคำขอเงินคืน" />
          <FormController type="divider" />
          <Grid item xs={12} sm={12}>
            <Typography
              variant="body1"
              sx={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}
            >
              งาน:{' '}
              <Typography variant="body1" color="primary">
                <Link
                  href={`/job/${jobId}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {refundDetails?.title}
                </Link>
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography
              variant="body1"
              sx={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}
            >
              นักแสดงที่ต้องการขอเงินคืน:{' '}
              <Typography variant="body1" color="primary">
                <Link
                  href={`/profile/${actorId}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {`${refundDetails?.user.firstname} ${
                    refundDetails?.user?.middlename || ''
                  } ${refundDetails?.user.lastname}`}
                </Link>
              </Typography>
            </Typography>
          </Grid>
          <FormController
            type="textField"
            control={control as any}
            name="reason"
            label="เหตุผลที่ต้องการขอเงินคืน"
            optional={false}
          />
          <FormController
            type="uploadFile"
            sx={{ alignItems: 'flex-start' }}
            control={control as any}
            name="evidenceUrl"
            label="อัปโหลดรูปถ่ายหลักฐาน"
            handleUploadFile={handleUploadFile}
          />
          <Grid
            item
            xs={12}
            sm={12}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Link
              href={`/job/${jobId}/actor`}
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
              color="success"
              type="submit"
              variant="contained"
              sx={{ borderRadius: '12px' }}
            >
              ยืนยัน
            </Button>
          </Grid>
        </Grid>
      </RequestRefundContainer>
      <Modal open={isModalOpen}>
        <ResultModalBody jobId={+jobId} />
      </Modal>
    </>
  )
}

export default withGuard(RequestRefundPage, 'verified', [UserType.CASTING])
