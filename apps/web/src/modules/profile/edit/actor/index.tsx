import { AccountCircleOutlined, ArticleOutlined } from '@mui/icons-material'
import { Button, CircularProgress, Grid } from '@mui/material'
import FormController from 'common/components/FormController'
import MenuBar from 'common/components/MenuBar'
import ProfileImage from 'common/components/ProfileImage'
import { Fragment } from 'react'

import { FORM_LAYOUT } from './constants'
import useEditActorForm from './hooks/useEditActorForm'
import { CardContainer, RootContainer } from './styled'

const EditCastingProfile = () => {
  const {
    handleClickSubmit,
    control,
    imageUrl,
    isDataLoading,
    handleUploadImage,
    loading,
    user,
  } = useEditActorForm()
  const MOCK_MENU = [
    { icon: <AccountCircleOutlined />, label: 'โปรไฟล์', href: '/about' },
    { icon: <ArticleOutlined />, label: 'เรซูเม่', href: '/blog' },
  ]
  return (
    <RootContainer>
      <MenuBar menu={MOCK_MENU} sx={{ width: '15vw' }} />
      <CardContainer variant="outlined">
        {isDataLoading ? (
          <CircularProgress />
        ) : (
          <form onSubmit={handleClickSubmit}>
            <Grid container spacing={2} sx={{ padding: '12px' }}>
              {FORM_LAYOUT.map((props) => (
                <Fragment key={JSON.stringify(props)}>
                  {props.type === 'uploadFile' && (
                    <Grid item width="100%">
                      <ProfileImage
                        src={imageUrl}
                        userId={user!.userId}
                        firstName={user!.firstName}
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
                    control={control as any}
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
                  บันทึกข้อมูล
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </CardContainer>
      <div style={{ width: '15vw' }} />
    </RootContainer>
  )
}

export default EditCastingProfile
