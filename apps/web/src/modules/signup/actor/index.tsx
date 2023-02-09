import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material'
import FormController from 'common/components/FormController'
import { useUser } from 'common/context/UserContext'
import { useRouter } from 'next/router'
import React from 'react'
import { Control, FieldValues } from 'react-hook-form'

import { FORM_LAYOUT } from './constants'
import useActorForm from './hooks/useActorForm'
import { FormContainer, RootContainer } from './styled'

const ActorSignUp = () => {
  const { loading, control, handleClickSubmit, handleUploadFile } =
    useActorForm()

  const router = useRouter()
  const user = useUser()

  if (user && !user.isVerified) {
    router.replace('/waiting')
    return
  }

  if (user && user.isVerified) {
    router.replace('/job')
    return
  }

  return (
    <RootContainer onSubmit={handleClickSubmit}>
      <Typography color="primary" variant="h3">
        Modela
      </Typography>
      <FormContainer variant="outlined">
        <Grid container spacing={2} sx={{ padding: '12px' }}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
              นักแสดง
            </Typography>
          </Grid>
          {FORM_LAYOUT.map((props) => (
            <FormController
              // I do not know why I cannot directly pass control
              control={control as unknown as Control<FieldValues>}
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

export default ActorSignUp
