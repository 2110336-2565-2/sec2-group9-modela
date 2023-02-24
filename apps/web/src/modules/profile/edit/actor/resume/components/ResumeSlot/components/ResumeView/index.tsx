import { DeleteOutlineOutlined, EditOutlined } from '@mui/icons-material'
import { Typography } from '@mui/material'
import Link from 'next/link'

import { ActionButtonContainer, TitleContainer } from './styled'
import { IResumeViewProps } from './types'

const ResumeView = (props: IResumeViewProps) => {
  const { handleDelete, handleToggleEdit, name, resumeUrl } = props
  return (
    <>
      <TitleContainer>
        <Typography>{name}</Typography>
        <ActionButtonContainer>
          <EditOutlined
            color="primary"
            sx={{ cursor: 'pointer' }}
            onClick={handleToggleEdit}
          />
          <DeleteOutlineOutlined
            color="primary"
            sx={{ cursor: 'pointer' }}
            onClick={handleDelete}
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
  )
}

export default ResumeView
