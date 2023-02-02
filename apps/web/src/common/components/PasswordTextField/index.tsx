import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material'
import { useShowPassword } from 'common/hooks/useShowPassword'
import { FC } from 'react'

const PasswordTextField: FC<TextFieldProps> = (props) => {
  const { showPassword, handleClickShowPassword, handleMouseDownPassword } =
    useShowPassword()

  return (
    <TextField
      type={showPassword ? 'password' : 'text'}
      label="รหัสผ่าน"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              color="primary"
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  )
}

export default PasswordTextField
