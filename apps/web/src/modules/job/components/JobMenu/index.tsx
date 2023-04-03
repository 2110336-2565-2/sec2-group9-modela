import { JobStatus } from '@modela/dtos'
import { AccountCircleOutlined, ArticleOutlined } from '@mui/icons-material'
import { Typography } from '@mui/material'
import MenuBar from 'common/components/MenuBar'
import { useRouter } from 'next/router'
import React from 'react'

import StatusChangeModal from './components/StatusChangeModal'
import { NEXT_STATUS_NAME, STATUS_NAME } from './constants'
import useSummaryData from './hooks/useSummaryData'
import { MenuContainer, StatusButton, SummaryContainer } from './styled'
import { JobMenuProps } from './types'

const JobMenu = ({ focus, setStatus }: JobMenuProps) => {
  const router = useRouter()
  const { jobId } = router.query
  const {
    status,
    pendingActorCount,
    isModalOpen,
    handleCloseModal,
    handleStatusChange,
    handleModalOpen,
    isPaid,
  } = useSummaryData(setStatus)

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
        {status === JobStatus.SELECTION_ENDED && !isPaid && (
          <Typography variant="body1" color="error" sx={{ fontWeight: 700 }}>
            กรุณาโอนเงินก่อนจึงจะสามารถเปลี่ยนสถานะต่อได้
          </Typography>
        )}
      </SummaryContainer>
      {NEXT_STATUS_NAME[status!] && (
        <StatusButton
          variant="contained"
          onClick={handleModalOpen}
          disabled={status === JobStatus.SELECTION_ENDED && !isPaid}
        >
          {NEXT_STATUS_NAME[status!]}
        </StatusButton>
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
