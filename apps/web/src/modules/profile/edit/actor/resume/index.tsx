import { Add } from '@mui/icons-material'
import { AccountCircleOutlined, ArticleOutlined } from '@mui/icons-material'
import {
  CircularProgress,
  Divider,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material'
import MenuBar from 'common/components/MenuBar'
import React from 'react'

import DeleteModal from './components/DeleteModal'
import ResumeSlot from './components/ResumeSlot'
import { useResumeInfo } from './hooks'
import { AddResumeButton, CardContainer, RootContainer } from './styled'

const ActorResume = () => {
  const {
    resume,
    resumeName,
    isModalOpen,
    isLoading,
    handleOpenDeleteModal,
    handleCancelUpdate,
    handleAddNewResume,
    handleCloseDeleteModal,
    handleDeleteResume,
    handleUpdateResume,
  } = useResumeInfo()
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  return (
    <RootContainer>
      <MenuBar
        focus="เรซูเม่"
        sx={{ height: 'fit-content', width: '17vw', maxWidth: '250px' }}
        menu={[
          {
            icon: <AccountCircleOutlined />,
            href: '/profile',
            label: 'โปรไฟล์',
          },
          {
            icon: <ArticleOutlined />,
            href: '/profile/resume',
            label: 'เรซูเม่',
          },
        ]}
      />
      <CardContainer variant="outlined">
        <Typography variant="h5">เรซูเม่</Typography>
        <Divider sx={{ width: '100%' }} />
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            {resume.map((val) => (
              <ResumeSlot
                key={val.resumeId}
                {...val}
                handleDelete={handleOpenDeleteModal}
                handleCancel={handleCancelUpdate}
                handleSubmit={handleUpdateResume}
              />
            ))}
            <AddResumeButton variant="text" onClick={handleAddNewResume}>
              <Add />
              เพิ่มเรซูเม่
            </AddResumeButton>
          </>
        )}

        <DeleteModal
          name={resumeName}
          isOpen={isModalOpen}
          handleClose={handleCloseDeleteModal}
          handleSubmit={handleDeleteResume}
        />
      </CardContainer>
      {!isMobile && <div style={{ width: '17vw', maxWidth: '250px' }} />}
    </RootContainer>
  )
}

export default ActorResume
