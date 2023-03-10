import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material'
import FormController from 'common/components/FormController'
import withGuard from 'common/hoc/withGuard'
import React from 'react'

import { FORM_LAYOUT } from './constants'
import useCastingForm from './hooks/useCastingForm'
import { FormContainer, RootContainer } from './styled'

const CastingSignup = () => {
  const { loading, control, handleClickSubmit, handleUploadFile } =
    useCastingForm()

  return (
    <RootContainer onSubmit={handleClickSubmit}>
      <Typography color="primary" variant="h3">
        Modela
      </Typography>
      <FormContainer variant="outlined">
        <Grid container spacing={2} sx={{ padding: '12px' }}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
              ผู้กำกับ
            </Typography>
          </Grid>
          {FORM_LAYOUT.map((props) => (
            <FormController
              // I do not know why I cannot directly pass control
              control={control as any}
              key={JSON.stringify(props)}
              handleUploadFile={
                props.type === 'uploadFile' ? handleUploadFile : undefined
              }
              {...props}
            />
          ))}
          <Grid item xs={12} sm={12}>
            <Box display="flex" justifyContent="center">
              <Button
                sx={{ borderRadius: '12px' }}
                size="large"
                variant="contained"
                type="submit"
                disabled={loading}
                startIcon={
                  loading && <CircularProgress size="24px" color="primary" />
                }
              >
                สมัครสมาชิก
              </Button>
            </Box>
          </Grid>
        </Grid>
      </FormContainer>
    </RootContainer>
  )
}

export default withGuard(CastingSignup, 'notLoggedIn')
