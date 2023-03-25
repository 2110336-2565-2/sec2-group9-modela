import { Button, Grid, Modal, Typography } from '@mui/material'
import FormController from 'common/components/FormController'
import Link from 'next/link'
import { useRouter } from 'next/router'

import ResultModalBody from './components/ResultModalBody'
import useRefundForm from './hooks/useRefundForm'
import { RequestRefundContainer } from './styled'

const RequestRefundPage = () => {
  const { control, handleUploadFile, handleSubmit, isModalOpen } =
    useRefundForm()
  const router = useRouter()

  const { jobId, actorId } = router.query

  return (
    <>
      <RequestRefundContainer onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ padding: '12px' }}>
          <FormController type="title" label="ส่งคำขอเงินคืน" />
          <FormController type="divider" />
          <Grid item xs={12} sm={12}>
            <Typography variant="body1" sx={{ display: 'flex', gap: '6px' }}>
              งาน:{' '}
              <Typography variant="body1" color="primary">
                <Link
                  href={`/job/${jobId}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  หานักแสดงถ่ายงานพี
                </Link>
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="body1" sx={{ display: 'flex', gap: '6px' }}>
              นักแสดงที่ต้องการขอเงินคืน:{' '}
              <Typography variant="body1" color="primary">
                <Link
                  href={`/profile/${actorId}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  ณภัทร โกสิยากรณ์
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
            control={control as any}
            name="evidenceUrl"
            label="เหตุผลที่ต้องการขอเงินคืน"
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
        <ResultModalBody jobId={jobId as string} />
      </Modal>
    </>
  )
}

export default RequestRefundPage
