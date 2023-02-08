import { Divider, Grid, TextField } from '@mui/material'
import PasswordTextField from 'common/components/PasswordTextField'
import { memo } from 'react'
import { Controller, FieldValues } from 'react-hook-form'

import UploadFile from './components/UploadFile'
import { IFormControllerProps } from './types'

const FormController = <T extends FieldValues>(
  props: IFormControllerProps<T>,
) => {
  const {
    type,
    xs,
    sm,
    control,
    name,
    handleUploadFile,
    fullWidth,
    label,
    required,
  } = props

  return (
    <Grid xs={xs} sm={sm}>
      {type === 'divider' ? (
        <Divider />
      ) : (
        <Controller
          name={name!}
          control={control}
          render={(props) => {
            if (type === 'textField')
              return (
                <TextField
                  required={required}
                  fullWidth={fullWidth}
                  label={label}
                  {...props.field}
                  error={props.fieldState.invalid}
                  helperText={props.fieldState.error?.message}
                />
              )
            if (type === 'uploadFile')
              return (
                <UploadFile
                  label={label}
                  handleSelectFile={handleUploadFile!}
                  error={props.fieldState.invalid}
                  errorMessage={props.fieldState.error?.message}
                  url={props.field.value}
                />
              )

            return (
              <PasswordTextField
                required={required}
                fullWidth={fullWidth}
                label={label}
                {...props.field}
                error={props.fieldState.invalid}
                helperText={props.fieldState.error?.message}
              />
            )
          }}
        />
      )}
    </Grid>
  )
}

export default memo(FormController)
