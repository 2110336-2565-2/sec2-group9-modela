import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material'
import FormController from 'common/components/FormController'
import withNotLoggedInGuard from 'common/hoc/withNotLoggedInGuard'
import Link from 'next/link'
import React from 'react'
import { Control, FieldValues } from 'react-hook-form'

import { FORM_LAYOUT } from './constants'
import useLoginForm from './hooks/useLoginForm'
import { FormContainer, RootContainer } from './styled'

const Login = () => {
  const { loading, control, handleClickSubmit } = useLoginForm()

  return (
    <RootContainer onSubmit={handleClickSubmit}>
      <Typography color="primary" variant="h3">
        Modela
      </Typography>
      <FormContainer variant="outlined">
        <Grid container spacing={2} sx={{ padding: '12px' }}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
              เข้าสู่ระบบ
            </Typography>
          </Grid>
          {FORM_LAYOUT.map((props) => (
            <FormController
              // I do not know why I cannot directly pass control
              control={control as unknown as Control<FieldValues>}
              key={JSON.stringify(props)}
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
                เข้าสู่ระบบ
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
              ยังไม่มีบัญชี ?{' '}
              <Link href="/" passHref style={{ textDecoration: 'none' }}>
                <Typography variant="subtitle1" color="primary" component="a">
                  ลงทะเบียน
                </Typography>
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </FormContainer>
    </RootContainer>
  )
}

export default withNotLoggedInGuard(Login)
