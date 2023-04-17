import { FileDownloadOutlined } from '@mui/icons-material'
import { Typography } from '@mui/material'
import React from 'react'

import { StyledButton } from './styled'
import { ResumeDownloadButtonProps } from './types'

const ResumeDownloadButton = ({ resumeUrl }: ResumeDownloadButtonProps) => {
  return (
    <StyledButton
      target="_blank"
      rel="noopener"
      href={resumeUrl}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <FileDownloadOutlined color="primary" />
      <Typography variant="subtitle2" color="primary">
        เรซูเม่
      </Typography>
    </StyledButton>
  )
}

export default ResumeDownloadButton
