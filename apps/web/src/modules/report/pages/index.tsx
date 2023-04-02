import { UserType } from '@modela/database'
import {
  Button,
  CircularProgress,
  Divider,
  Link,
  Typography,
} from '@mui/material'
import TextField from 'common/components/TextField'
import withGuard from 'common/hoc/withGuard'
import React from 'react'
import { Controller } from 'react-hook-form'

import useReport from '../hooks/useReport'
import { RootContainer } from './styled'

const ReportPage = () => {
  const { jid, jobName, control, handleClickSubmit, loading } = useReport()

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
          sx={{ cursor: 'pointer', wordBreak: 'break-word' }}
          href={`/job/${jid}`}
        >
          {jobName}
        </Link>
      </Typography>

      <Divider sx={{ marginTop: '1rem' }} />
      <Controller
        name="description"
        control={control}
        render={(props) => (
          <TextField
            fullWidth
            multiline
            rows={3}
            {...props.field}
            inputRef={props.field.ref}
            error={props.fieldState.invalid}
            helperText={props.fieldState.error?.message}
            placeholder="เหตุผล"
          />
        )}
      />

      <Button
        sx={{ borderRadius: '12px', alignSelf: 'center' }}
        size="large"
        variant="contained"
        type="submit"
        disabled={loading}
        startIcon={loading && <CircularProgress size={20} />}
      >
        แจ้งปัญหา
      </Button>
    </RootContainer>
  )
}

export default withGuard(ReportPage, 'verified', [UserType.ACTOR])
