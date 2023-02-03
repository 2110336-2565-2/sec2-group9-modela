import { Box, Button, Divider, Grid, MenuItem, Typography } from '@mui/material'
import PasswordTextField from 'common/components/PasswordTextField'
import TextField from 'common/components/TextField'
import React, { Fragment } from 'react'

import { GENDER_CHOICE } from './constants'
import { FormContainer, RootContainer } from './styled'

const ActorSignUp = () => {
  return (
    <RootContainer>
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
            <TextField required fullWidth label="คำนำหน้าชื่อ" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required fullWidth label="ชื่อจริง" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="ชื่อกลาง (ไม่จำเป็น)" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required fullWidth label="นามสกุล" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="สัญชาติ" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select required fullWidth label="เพศ">
              {GENDER_CHOICE.map((props) => (
                <Fragment key={props.value?.toString() || `${Math.random()}`}>
                  <MenuItem {...props} />
                </Fragment>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField required fullWidth label="เบอร์โทรศัพท์" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              label="เลขบัตรประจำตัวประชาชน/เลขพาสปอร์ต"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            หกฟหก
          </Grid>
          <Grid item xs={12} sm={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField required fullWidth label="อีเมล" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <PasswordTextField required fullWidth label="รหัสผ่าน" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <PasswordTextField required fullWidth label="ยืนยันรหัสผ่าน" />
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
