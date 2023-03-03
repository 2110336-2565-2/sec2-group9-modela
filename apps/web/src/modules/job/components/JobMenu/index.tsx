import { AccountCircleOutlined, ArticleOutlined } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import MenuBar from 'common/components/MenuBar'
import { useRouter } from 'next/router'
import React from 'react'

import StatusChangeModal from './components/StatusChangeModal'
import { NEXT_STATUS_NAME, STATUS_NAME } from './constants'
import useSummaryData from './hooks/useSummaryData'
import { MenuContainer, SummaryContainer } from './styled'
import { JobMenuProps } from './types'

const JobMenu = ({ focus }: JobMenuProps) => {
  const router = useRouter()
  const { jobId } = router.query
  const {
    status,
    pendingActorCount,
    isModalOpen,
    handleCloseModal,
    handleStatusChange,
    handleModalOpen,
  } = useSummaryData()

  return (
    <MenuContainer>
      <MenuBar
        menu={[
          {
            icon: <ArticleOutlined />,
            label: 'ข้อมูลงาน',
            href: `/job/${jobId}`,
          },
          {
            icon: <AccountCircleOutlined />,
            label: 'ข้อมูลนักแสดง',
            href: `/job/${jobId}/actor`,
          },
        ]}
        focus={focus === 'detail' ? 'ข้อมูลงาน' : 'ข้อมูลนักแสดง'}
        sx={{ width: '300px' }}
      />
      <SummaryContainer>
        <Typography variant="body1">
          สถานะปัจจุบัน:{' '}
          <span style={{ fontWeight: 700 }}>{STATUS_NAME[status!]}</span>
        </Typography>
        <Typography variant="body1" sx={{ marginTop: '-4px' }}>
          มีนักแสดงที่กำลังรออยู่ {pendingActorCount} คน
        </Typography>
      </SummaryContainer>
      {NEXT_STATUS_NAME[status!] && (
        <Button
          variant="contained"
          sx={{
            borderRadius: '12px',
            width: '100%',
            fontSize: '16px',
          }}
          onClick={handleModalOpen}
        >
          {NEXT_STATUS_NAME[status!]}
        </Button>
      )}
      <StatusChangeModal
        isOpen={isModalOpen}
        status={status!}
        handleClose={handleCloseModal}
        handleSubmit={handleStatusChange}
      />
    </MenuContainer>
  )
}

export default JobMenu
