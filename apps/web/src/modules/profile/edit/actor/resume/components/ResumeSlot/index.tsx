import { DeleteOutlineOutlined, EditOutlined } from '@mui/icons-material'
import { Typography } from '@mui/material'
import Link from 'next/link'

import ResumeEdit from './components/ResumeEdit'
import {
  ActionButtonContainer,
  ResumeSlotContainer,
  TitleContainer,
} from './styled'

const ResumeSlot = () => {
  return (
    <ResumeSlotContainer>
      <TitleContainer>
        <Typography>เรซูเม่ที่ใช้สมัครงานพี</Typography>
        <ActionButtonContainer>
          <EditOutlined color="primary" sx={{ cursor: 'pointer' }} />
          <DeleteOutlineOutlined color="primary" />
        </ActionButtonContainer>
      </TitleContainer>
      <Link
        href="https://www.google.com"
        passHref
        target="_blank"
        rel="noopener"
        style={{ textDecoration: 'none' }}
      >
        <Typography color="primary" variant="subtitle1" fontWeight={500}>
          เรซูเม่
        </Typography>
      </Link>
      <ResumeEdit />
    </ResumeSlotContainer>
  )
}

export default ResumeSlot
