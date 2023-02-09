import { UserType } from '@modela/database'
import {
  Alert,
  Button,
  CircularProgress,
  Divider,
  Link,
  Snackbar,
  Typography,
} from '@mui/material'
import TextField from 'common/components/TextField'
import withGuard from 'common/hoc/withGuard'
import React from 'react'
import { Controller } from 'react-hook-form'

import useReport from '../hooks/useReport'
import { RootContainer } from './styled'

const ReportPage = () => {
  const {
    jid,
    jobName,
    control,
    handleClickSubmit,
    loading,
    showNoti,
    closeNoti,
  } = useReport()

  return (
    <RootContainer onSubmit={handleClickSubmit}>
      <Typography variant="h6" textAlign="center">
        แจ้งปัญหา
      </Typography>
      <Typography variant="body1">
        {'งานที่ต้องการแจ้งปัญหา:' + ' '}
        <Link
          variant="body1"
          color="primary"
          sx={{ cursor: 'pointer' }}
          href={`/job/${jid}`}
        >
          {jobName}
        </Link>
      </Typography>

      <Divider sx={{ marginTop: '1rem' }} />
      <Controller
        name="description"
        control={control}
        render={(prop) => (
          <TextField
            fullWidth
            multiline
            rows={3}
            {...prop.field}
            error={prop.fieldState.invalid}
            helperText={prop.fieldState.error?.message}
            placeholder="เหตุผล"
          />
        )}
      />

      <Button
        sx={{ borderRadius: '12px', alignSelf: 'center' }}
        size="large"
        variant="contained"
        type="submit"
        startIcon={loading && <CircularProgress size={20} />}
      >
        แจ้งปัญหา
      </Button>
      <Snackbar open={showNoti} autoHideDuration={6000} onClose={closeNoti}>
        <Alert onClose={closeNoti} severity="success" sx={{ width: '100%' }}>
          ขอบคุณที่แจ้งปัญหา ทางทีมงานจะดำเนินการตรวจสอบต่อไป
        </Alert>
      </Snackbar>
    </RootContainer>
  )
}

export default withGuard(ReportPage, [UserType.ACTOR])
