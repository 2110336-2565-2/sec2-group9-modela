import { Divider, Grid, MenuItem } from '@mui/material'
import PasswordTextField from 'common/components/PasswordTextField'
import TextField from 'common/components/TextField'
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
    selectProps,
  } = props

  return (
    <Grid item xs={xs} sm={sm}>
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

            if (type === 'select')
              return (
                <TextField
                  select
                  required={required}
                  fullWidth={fullWidth}
                  label={label}
                  {...props.field}
                  error={props.fieldState.invalid}
                  helperText={props.fieldState.error?.message}
                >
                  {selectProps?.map((choice) => (
                    <MenuItem
                      {...choice}
                      key={choice.value?.toString() || `${Math.random()}`}
                    />
                  ))}
                </TextField>
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
