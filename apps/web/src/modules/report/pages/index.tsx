import { Button, Divider, Typography } from '@mui/material'
import TextField from 'common/components/TextField'
import React from 'react'
import { Controller } from 'react-hook-form'

import useReport from '../hooks/useReport'
import { RootContainer } from './styled'

const ReportPage = () => {
  const { control, handleClickSubmit } = useReport()
  return (
    <RootContainer onSubmit={handleClickSubmit}>
      <Typography variant="h6" textAlign="center">
        แจ้งปัญหา
      </Typography>
      <Typography variant="body1">งานที่ต้องการแจ้งปัญหา:</Typography>
      <Divider />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            fullWidth
            multiline
            rows={3}
            {...field}
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
