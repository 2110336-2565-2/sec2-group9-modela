import { Button, Divider, Link, Typography } from '@mui/material'
import TextField from 'common/components/TextField'
import React from 'react'
import { Controller } from 'react-hook-form'

import useReport from '../hooks/useReport'
import { RootContainer } from './styled'

const ReportPage = () => {
  const { jid, jobName, control, handleClickSubmit } = useReport()
  return (
    <RootContainer onSubmit={handleClickSubmit}>
      <Typography variant="h6" textAlign="center">
        แจ้งปัญหา
      </Typography>
      <div style={{ display: 'flex' }}>
        <Typography variant="body1">งานที่ต้องการแจ้งปัญหา:</Typography>
        <Link
          variant="body1"
          color="primary"
          sx={{ marginLeft: '0.5rem', cursor: 'pointer' }}
          href={`/job/${jid}`}
        >
          {jobName}
        </Link>
      </div>

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
      >
        แจ้งปัญหา
      </Button>
    </RootContainer>
  )
}

//TODO add PageGuard later
export default ReportPage
