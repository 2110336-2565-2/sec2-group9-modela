import { AccountCircleOutlined, ArticleOutlined } from '@mui/icons-material'
import { Theme, useMediaQuery } from '@mui/material'
import MenuBar from 'common/components/MenuBar'
import { useRouter } from 'next/router'
import React from 'react'

import { JobMenuProps } from './types'

const JobMenu = ({ focus }: JobMenuProps) => {
  const router = useRouter()
  const { jobId } = router.query

  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))
  if (isTablet) return <></>

  return (
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
  )
}

export default JobMenu
