import { AccountCircleOutlined, ArticleOutlined } from '@mui/icons-material'
import { Typography } from '@mui/material'
import MenuBar from 'common/components/MenuBar'
import { useRouter } from 'next/router'
import React from 'react'

import { STATUS_NAME } from './constants'
import useSummaryData from './hooks/useSummaryData'
import { MenuContainer, SummaryContainer } from './styled'
import { JobMenuProps } from './types'

const JobMenu = ({ focus }: JobMenuProps) => {
  const router = useRouter()
  const { jobId } = router.query
  const { status, pendingActorCount } = useSummaryData()

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
    </MenuContainer>
  )
}

export default JobMenu
