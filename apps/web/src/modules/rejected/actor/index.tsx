import { Box, Button, CircularProgress, Grid } from '@mui/material'
import FormController from 'common/components/FormController'
import React from 'react'
import { Control, FieldValues } from 'react-hook-form'

import { FORM_LAYOUT } from './constants'
import useActorForm from './hooks/useActorForm'
import { EditActorInfoFormProps } from './types'

const EditActorInfoForm = ({ initialData }: EditActorInfoFormProps) => {
  const { loading, control, handleClickSubmit, handleUploadFile } =
    useActorForm(initialData)

  return (
    <form onSubmit={handleClickSubmit}>
      <Grid container spacing={2} sx={{ padding: '12px' }}>
        {FORM_LAYOUT.map((props) => (
          <FormController
            control={control as unknown as Control<FieldValues>}
            key={JSON.stringify(props)}
            handleUploadFile={
              props.type === 'uploadFile' ? handleUploadFile : undefined
            }
            {...props}
          />
        ))}
        <Grid item xs={12} sm={12}>
          <Box display="flex" justifyContent="center">
            <Button
              sx={{ borderRadius: '12px' }}
              size="large"
              variant="contained"
              type="submit"
              disabled={loading}
              startIcon={
                loading && <CircularProgress size="24px" color="primary" />
              }
            >
              บันทึกข้อมูล
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  )
}

export default EditActorInfoForm
