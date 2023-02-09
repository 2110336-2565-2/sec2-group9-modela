import { Divider, Grid, MenuItem, Typography } from '@mui/material'
import { DesktopDatePicker, TimePicker } from '@mui/x-date-pickers'
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
      ) : type === 'typography' ? (
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          {label}
        </Typography>
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
            if (type === 'date')
              return (
                <DesktopDatePicker
                  label={label}
                  inputFormat="DD/MM/YYYY"
                  value={props.field.value}
                  onChange={(newValue) => props.field.onChange(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              )
            if (type === 'time')
              return (
                <TimePicker
                  label={label}
                  value={props.field.value}
                  onChange={(newValue) => props.field.onChange(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
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
