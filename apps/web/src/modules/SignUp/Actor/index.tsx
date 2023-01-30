import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  MenuItem,
  Typography,
} from '@mui/material'
import { TextField } from 'common/components/TextField'

import { formContainerStyle } from './styled'

const ActorSignUp = () => {
  return (
    <Box
      display="flex"
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap={2}
      // This will temporary use until layout is implemented
      margin="24px"
    >
      <Typography color="primary" variant="h3">
        Modela
      </Typography>
      <Card variant="outlined" sx={formContainerStyle}>
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
              <MenuItem>ชาย</MenuItem>
              <MenuItem>หญิง</MenuItem>
              <MenuItem>อื่น ๆ</MenuItem>
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
            <TextField required fullWidth label="รหัสผ่าน" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField required fullWidth label="ยืนยันรหัสผ่าน" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box display="flex" justifyContent="center">
              <Button
                sx={{ borderRadius: '12px' }}
                size="large"
                variant="contained"
              >
                สมัครสมาชิก
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default ActorSignUp
