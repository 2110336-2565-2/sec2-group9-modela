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
  const { type, xs = 12, sm = 12 } = props

  return (
    <Grid item xs={xs} sm={sm}>
      {type === 'divider' ? (
        <Divider />
      ) : type === 'title' ? (
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          {props.label}
        </Typography>
      ) : type === 'label' ? (
        <Typography>{props.label}</Typography>
      ) : (
        <Controller
          name={props.name!}
          control={props.control}
          render={({ field: { ref, ...field }, ...formProps }) => {
            if (type === 'textField')
              return (
                <TextField
                  required={!props.optional}
                  fullWidth={props.fullWidth}
                  label={props.label}
                  inputRef={ref}
                  {...field}
                  error={formProps.fieldState.invalid}
                  helperText={formProps.fieldState.error?.message}
                  {...props.inputProps}
                />
              )
            if (type === 'number')
              return (
                <TextField
                  required={!props.optional}
                  fullWidth={props.fullWidth}
                  label={props.label}
                  inputRef={ref}
                  {...field}
                  error={formProps.fieldState.invalid}
                  helperText={formProps.fieldState.error?.message}
                  onChange={(event) =>
                    field.onChange(
                      event.target.value === '' ? '' : +event.target.value,
                    )
                  }
                  type="number"
                  InputProps={{
                    inputProps: props.inputProps,
                  }}
                  {...props.inputProps}
                />
              )
            if (type === 'uploadFile')
              return (
                <UploadFile
                  label={props.label}
                  hideLink={props.hideLink}
                  handleSelectFile={props.handleUploadFile!}
                  error={formProps.fieldState.invalid}
                  errorMessage={formProps.fieldState.error?.message}
                  url={field.value}
                />
              )

            if (type === 'select')
              return (
                <TextField
                  select
                  required={!props.optional}
                  fullWidth={props.fullWidth}
                  label={props.label}
                  inputRef={ref}
                  {...field}
                  error={formProps.fieldState.invalid}
                  helperText={formProps.fieldState.error?.message}
                  {...props.inputProps}
                >
                  {props.selectProps?.map((choice) => (
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
                  label={props.label}
                  inputFormat="DD/MM/YYYY"
                  inputRef={ref}
                  {...field}
                  onChange={(newValue) => field.onChange(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={formProps.fieldState.invalid}
                      helperText={formProps.fieldState.error?.message}
                    />
                  )}
                />
              )
            if (type === 'time')
              return (
                <TimePicker
                  label={props.label}
                  ampm={false}
                  inputRef={ref}
                  {...field}
                  onChange={(newValue) => field.onChange(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={formProps.fieldState.invalid}
                      helperText={formProps.fieldState.error?.message}
                    />
                  )}
                />
              )

            return (
              <PasswordTextField
                required={!props.optional}
                fullWidth={props.fullWidth}
                label={props.label}
                {...field}
                inputRef={ref}
                error={formProps.fieldState.invalid}
                helperText={formProps.fieldState.error?.message}
                {...props.inputProps}
              />
            )
          }}
        />
      )}
    </Grid>
  )
}

export default memo(FormController)
