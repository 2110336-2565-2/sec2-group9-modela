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
    xs = 12,
    sm = 12,
    control,
    name,
    handleUploadFile,
    fullWidth = true,
    label,
    optional,
    selectProps,
    inputProps,
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
                  required={!optional}
                  fullWidth={fullWidth}
                  label={label}
                  {...props.field}
                  error={props.fieldState.invalid}
                  helperText={props.fieldState.error?.message}
                  {...inputProps}
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
                  {...inputProps}
                />
              )

            if (type === 'select')
              return (
                <TextField
                  select
                  required={!optional}
                  fullWidth={fullWidth}
                  label={label}
                  {...props.field}
                  error={props.fieldState.invalid}
                  helperText={props.fieldState.error?.message}
                  {...inputProps}
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
                required={!optional}
                fullWidth={fullWidth}
                label={label}
                {...props.field}
                error={props.fieldState.invalid}
                helperText={props.fieldState.error?.message}
                {...inputProps}
              />
            )
          }}
        />
      )}
    </Grid>
  )
}

export default memo(FormController)
