import { Add } from '@mui/icons-material'
import { Divider, Typography } from '@mui/material'
import React from 'react'

import DeleteModal from './components/DeleteModal'
import ResumeSlot from './components/ResumeSlot'
import { useResumeInfo } from './hooks'
import { AddResumeButton, CardContainer } from './styled'

const ActorResume = () => {
  const {
    resume,
    resumeName,
    isModalOpen,
    handleOpenDeleteModal,
    handleCancelUpdate,
    handleAddNewResume,
    handleCloseDeleteModal,
    handleDeleteResume,
    handleUpdateResume,
  } = useResumeInfo()

  return (
    <CardContainer>
      <Typography variant="h5">เรซูเม่</Typography>
      <Divider sx={{ width: '100%' }} />
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
      <DeleteModal
        name={resumeName}
        isOpen={isModalOpen}
        handleClose={handleCloseDeleteModal}
        handleSubmit={handleDeleteResume}
      />
    </CardContainer>
  )
}

export default ActorResume
