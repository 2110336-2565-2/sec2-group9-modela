import { DeleteOutlineOutlined, EditOutlined } from '@mui/icons-material'
import { Typography } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'

import ResumeEdit from './components/ResumeEdit'
import {
  ActionButtonContainer,
  ResumeSlotContainer,
  TitleContainer,
} from './styled'
import { IResumeSlotProps } from './types'

const ResumeSlot = (props: IResumeSlotProps) => {
  const { resumeId, handleDelete, handleCancel, isFirst, name, resumeUrl } =
    props
  const [isEdit, setEdit] = useState(!isFirst)

  return (
    <ResumeSlotContainer>
      {!isEdit ? (
        <>
          <TitleContainer>
            <Typography>{name}</Typography>
            <ActionButtonContainer>
              <EditOutlined
                color="primary"
                sx={{ cursor: 'pointer' }}
                onClick={() => setEdit(true)}
              />
              <DeleteOutlineOutlined
                color="primary"
                sx={{ cursor: 'pointer' }}
                onClick={() => handleDelete(resumeId)}
              />
            </ActionButtonContainer>
          </TitleContainer>
          <Link
            href={resumeUrl}
            passHref
            target="_blank"
            rel="noopener"
            style={{ textDecoration: 'none' }}
          >
            <Typography color="primary" variant="subtitle1" fontWeight={500}>
              เรซูเม่
            </Typography>
          </Link>
        </>
      ) : (
        <ResumeEdit
          name={name}
          resumeUrl={resumeUrl}
          resumeId={resumeId}
          handleCancel={handleCancel}
        />
      )}
    </ResumeSlotContainer>
  )
}

export default ResumeSlot
