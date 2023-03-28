import { DeleteOutlineOutlined, EditOutlined } from '@mui/icons-material'
import { Typography } from '@mui/material'
import Link from 'next/link'

import { ActionButtonContainer, TitleContainer } from './styled'
import { IResumeViewProps } from './types'

const ResumeView = (props: IResumeViewProps) => {
  const { handleDelete, name, resumeUrl, handleToggleEdit } = props
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
        style={{ textDecoration: 'none', width: 'fit-content' }}
      >
        <Typography color="primary" variant="subtitle1" fontWeight={500}>
          ดูเรซูเม่
        </Typography>
      </Link>
    </>
  )
}

export default ResumeView
