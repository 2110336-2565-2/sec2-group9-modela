import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from '@mui/material'
import PasswordTextField from 'common/components/PasswordTextField'
import TextField from 'common/components/TextField'
import { useUser } from 'common/context/UserContext'
import { useRouter } from 'next/router'
import React from 'react'
import { Controller } from 'react-hook-form'

import UploadFile from '../components/UploadFile'
import useCastingForm from './hooks/useCastingForm'
import { FormContainer, RootContainer } from './styled'

const CastingSignup = () => {
  const { loading, control, handleClickSubmit, handleUploadFile } =
    useCastingForm()

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
          <Grid item xs={12} sm={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="firstName"
              control={control}
              render={(props) => (
                <TextField
                  required
                  fullWidth
                  label="ชื่อจริง"
                  {...props.field}
                  error={props.fieldState.invalid}
                  helperText={props.fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="middleName"
              control={control}
              render={(props) => (
                <TextField
                  fullWidth
                  label="ชื่อกลาง (ไม่จำเป็น)"
                  {...props.field}
                  error={props.fieldState.invalid}
                  helperText={props.fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Controller
              name="lastName"
              control={control}
              render={(props) => (
                <TextField
                  required
                  fullWidth
                  label="นามสกุล"
                  {...props.field}
                  error={props.fieldState.invalid}
                  helperText={props.fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Controller
              name="companyName"
              control={control}
              render={(props) => (
                <TextField
                  required
                  fullWidth
                  label="ชื่อบริษัท"
                  {...props.field}
                  error={props.fieldState.invalid}
                  helperText={props.fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Controller
              name="companyId"
              control={control}
              render={(props) => (
                <TextField
                  required
                  fullWidth
                  label="เลขจดทะเบียน"
                  {...props.field}
                  error={props.fieldState.invalid}
                  helperText={props.fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Controller
              name="employmentCertUrl"
              control={control}
              render={(props) => (
                <UploadFile
                  label="หนังสือรับรองการทำงาน"
                  handleSelectFile={handleUploadFile}
                  error={props.fieldState.invalid}
                  errorMessage={props.fieldState.error?.message}
                  url={props.field.value}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Controller
              name="email"
              control={control}
              render={(props) => (
                <TextField
                  required
                  fullWidth
                  label="อีเมล"
                  {...props.field}
                  error={props.fieldState.invalid}
                  helperText={props.fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Controller
              name="password"
              control={control}
              render={(props) => (
                <PasswordTextField
                  required
                  fullWidth
                  label="รหัสผ่าน"
                  {...props.field}
                  error={props.fieldState.invalid}
                  helperText={props.fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Controller
              name="confirmPassword"
              control={control}
              render={(props) => (
                <PasswordTextField
                  required
                  fullWidth
                  label="ยืนยันรหัสผ่าน"
                  {...props.field}
                  error={props.fieldState.invalid}
                  helperText={props.fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box display="flex" justifyContent="center">
              <Button
                sx={{ borderRadius: '12px' }}
                size="large"
                variant="contained"
                type="submit"
                disabled={loading}
                startIcon={
                  loading && <CircularProgress size="24px" color="secondary" />
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

export default CastingSignup
