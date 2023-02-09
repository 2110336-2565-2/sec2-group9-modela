import { UserType } from '@modela/database'
import { Grid } from '@mui/material'
import FormController from 'common/components/FormController'
import withGuard from 'common/hoc/withGuard'
import React from 'react'
import { Control, FieldValues } from 'react-hook-form'

import AddShootingButton from './components/AddShootingButton'
import ShootingForm from './components/ShootingForm'
import SubmitButton from './components/SubmitButton'
import { FORM_LAYOUT } from './constant'
import useJobForm from './hooks/useJobForm'
import { RootContainer } from './styled'
import { JobformProps } from './types'

const PostJobPage = ({ edit }: JobformProps) => {
  const { control, handleClickSubmit, fields, handleAppend, remove } =
    useJobForm(edit)

  return (
    <RootContainer onSubmit={handleClickSubmit}>
      <Grid container spacing={2} sx={{ padding: '12px' }}>
        {FORM_LAYOUT.map((props) => {
          if (props.type === 'shooting')
            return (
              <>
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
              </>
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
          <SubmitButton />
        </Grid>
      </Grid>
    </RootContainer>
  )
}

export default withGuard(PostJobPage, [UserType.CASTING])
