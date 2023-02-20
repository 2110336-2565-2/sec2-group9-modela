import { Button, CircularProgress, Grid } from '@mui/material'
import FormController from 'common/components/FormController'
import ProfileImage from 'common/components/ProfileImage'
import { Fragment } from 'react'
import { Control, FieldValues } from 'react-hook-form'

import { FORM_LAYOUT } from './constants'
import useEditCastingForm from './hooks/useEditCastingForm'
import { CardContainer } from './styled'

const EditCastingProfile = () => {
  const { handleClickSubmit, control, imageUrl, handleUploadImage, loading } =
    useEditCastingForm()

  return (
    <CardContainer variant="outlined">
      <form onSubmit={handleClickSubmit}>
        <Grid container spacing={2} sx={{ padding: '12px' }}>
          {FORM_LAYOUT.map((props) => (
            <Fragment key={JSON.stringify(props)}>
              {props.type === 'uploadFile' && (
                <Grid item width="100%">
                  <ProfileImage
                    src={imageUrl}
                    userId={123}
                    firstName="hello"
                    sx={{
                      margin: 'auto',
                      width: '150px',
                      height: '150px',
                    }}
                  />
                </Grid>
              )}
              <FormController
                // I do not know why I cannot directly pass control
                control={control as unknown as Control<FieldValues>}
                handleUploadFile={handleUploadImage}
                {...props}
              />
            </Fragment>
          ))}
          <Grid item width="100%" display="flex" justifyContent="center">
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
              สมัครสมาชิก
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContainer>
  )
}

export default EditCastingProfile
