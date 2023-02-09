import { Grid } from '@mui/material'
import FormController from 'common/components/FormController'
import React from 'react'
import { Control, FieldValues } from 'react-hook-form'

import AddShootingButton from './components/AddShootingButton'
import ShootingForm from './components/ShootingForm'
import SubmitButton from './components/SubmitButton'
import { DEFAULT_FORM_VALUES, FORM_LAYOUT } from './constant'
import useFormNavbar from './hooks/useFormNavbar'
import useJobForm from './hooks/useJobForm'
import { FormContainer, RootContainer } from './styled'
import { JobFormProps } from './types'

const PostJobPage = ({ edit, initialValues }: JobFormProps) => {
  const { control, handleClickSubmit, fields, handleAppend, remove } =
    useJobForm(initialValues || DEFAULT_FORM_VALUES, edit)
  useFormNavbar(edit)

  return (
    <RootContainer onSubmit={handleClickSubmit}>
      <FormContainer variant="outlined">
        <Grid container spacing={2} sx={{ padding: '12px' }}>
          {FORM_LAYOUT.map((props) => {
            if (props.type === 'shooting')
              return (
                <React.Fragment key="shooting">
                  <Grid container item spacing={2}>
                    {fields.map((field, index) => (
                      <ShootingForm
                        index={index}
                        control={control}
                        id={field.id}
                        key={field.id}
                        remove={remove}
                      />
                    ))}
                  </Grid>
                  <Grid item xs={12}>
                    <AddShootingButton onClick={handleAppend} />
                  </Grid>
                </React.Fragment>
              )
            return (
              <FormController
                control={control as unknown as Control<FieldValues>}
                key={JSON.stringify(props)}
                {...props}
              />
            )
          })}
          <Grid item xs={12}>
            <SubmitButton edit={edit} />
          </Grid>
        </Grid>
      </FormContainer>
    </RootContainer>
  )
}

export default PostJobPage
