import { TextField as TextFieldMUI, TextFieldProps } from '@mui/material'
import { FC } from 'react'

const TextField: FC<TextFieldProps> = (props) => {
  return (
    <TextFieldMUI
      size="small"
      {...props}
      InputProps={{
        ...props.InputProps,
        sx: {
          ...props.InputProps?.sx,
          borderRadius: '10px',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
          },
          '& ::-ms-reveal': {
            display: 'none',
          },
          '& ::-ms-clear': {
            display: 'none',
          },
        },
      }}
      InputLabelProps={{
        sx: {
          color: '#00000060',
        },
      }}
      sx={{
        ...props.sx,
        borderColor: 'white',
        backgroundColor: '#21212114',
        borderRadius: '10px',
      }}
    />
  )
}

export default TextField