import { Box, Button, Divider, Grid, MenuItem, Typography } from '@mui/material'
import PasswordTextField from 'common/components/PasswordTextField'
import TextField from 'common/components/TextField'
import React from 'react'
import { Controller } from 'react-hook-form'

import UploadFile from '../components/UploadFile'
import useActorForm from './hooks/useActorForm'
import { FormContainer, RootContainer } from './styled'
import { GENDER_CHOICE } from './utils/constants'

const ActorSignUp = () => {
  const { control, handleClickSubmit, handleUploadFile } = useActorForm()

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
              name="prefix"
              control={control}
              render={(props) => (
                <TextField
                  required
                  fullWidth
                  label="คำนำหน้าชื่อ"
                  {...props.field}
                  error={props.fieldState.invalid}
                  helperText={props.fieldState.error?.message}
                />
              )}
            />
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
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
            <Controller
              name="nationality"
              control={control}
              render={(props) => (
                <TextField
                  required
                  fullWidth
                  label="สัญชาติ"
                  {...props.field}
                  error={props.fieldState.invalid}
                  helperText={props.fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="gender"
              control={control}
              render={(props) => (
                <TextField
                  select
                  required
                  fullWidth
                  label="เพศ"
                  {...props.field}
                  error={props.fieldState.invalid}
                  helperText={props.fieldState.error?.message}
                >
                  {GENDER_CHOICE.map((choice) => (
                    <MenuItem
                      {...choice}
                      key={choice.value?.toString() || `${Math.random()}`}
                    />
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Controller
              name="phoneNumber"
              control={control}
              render={(props) => (
                <TextField
                  required
                  fullWidth
                  label="เบอร์โทรศัพท์"
                  {...props.field}
                  error={props.fieldState.invalid}
                  helperText={props.fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Controller
              name="ssn"
              control={control}
              render={(props) => (
                <TextField
                  required
                  fullWidth
                  label="เลขบัตรประจำตัวประชาชน/เลขพาสปอร์ต"
                  {...props.field}
                  error={props.fieldState.invalid}
                  helperText={props.fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Controller
              name="idCardImageUrl"
              control={control}
              render={(props) => (
                <UploadFile
                  label="อัปโหลดรูปถ่ายบัตรประชาชน / พาสปอร์ต"
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
