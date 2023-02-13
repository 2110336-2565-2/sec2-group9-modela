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
          render={({ field: { ref, ...field }, ...props }) => {
            if (type === 'textField')
              return (
                <TextField
                  required={!optional}
                  fullWidth={fullWidth}
                  label={label}
                  inputRef={ref}
                  {...field}
                  error={props.fieldState.invalid}
                  helperText={props.fieldState.error?.message}
                  {...inputProps}
                />
              )
            if (type === 'number')
              return (
                <TextField
                  required={!optional}
                  fullWidth={fullWidth}
                  label={label}
                  inputRef={ref}
                  {...field}
                  error={props.fieldState.invalid}
                  helperText={props.fieldState.error?.message}
                  onChange={(event) =>
                    field.onChange(
                      event.target.value === '' ? '' : +event.target.value,
                    )
                  }
                  type="number"
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
                  url={field.value}
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
                  inputRef={ref}
                  {...field}
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
                  inputRef={ref}
                  {...field}
                  onChange={(newValue) => field.onChange(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={props.fieldState.invalid}
                      helperText={props.fieldState.error?.message}
                    />
                  )}
                />
              )
            if (type === 'time')
              return (
                <TimePicker
                  label={label}
                  inputRef={ref}
                  {...field}
                  onChange={(newValue) => field.onChange(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={props.fieldState.invalid}
                      helperText={props.fieldState.error?.message}
                    />
                  )}
                />
              )

            return (
              <PasswordTextField
                required={!optional}
                fullWidth={fullWidth}
                label={label}
                {...field}
                inputRef={ref}
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
