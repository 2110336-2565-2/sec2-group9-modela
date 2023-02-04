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
          borderRadius: '10px',
          backgroundColor: '#21212114',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
          },
          '& ::-ms-reveal': {
            display: 'none',
          },
          '& ::-ms-clear': {
            display: 'none',
          },
          ...props.InputProps?.sx,
        },
      }}
      InputLabelProps={{
        sx: {
          color: '#00000060',
        },
      }}
      sx={{
        borderColor: 'white',
        borderRadius: '10px',
        backgroundColor: '#21212114',
        ...props.sx,
      }}
    />
  )
}

export default TextField
