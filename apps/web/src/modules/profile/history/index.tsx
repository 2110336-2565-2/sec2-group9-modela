import { UserType } from '@modela/dtos'
import {
  AccountCircleOutlined,
  ArticleOutlined,
  HistoryOutlined,
} from '@mui/icons-material'
import { CircularProgress } from '@mui/material'
import MenuBar from 'common/components/MenuBar'
import { useUser } from 'common/context/UserContext'
import withGuard from 'common/hoc/withGuard'
import JobCardContainer from 'modules/job/list/components/JobCardContainer'
import React from 'react'

import useJobData from './hooks/useJobData'
import { JobContainer, PlaceFill } from './styled'
const HistoryPage = () => {
  const { job } = useJobData()
  const { user } = useUser()

  const MENU_ITEM_ACTOR = [
    { icon: <AccountCircleOutlined />, label: 'โปรไฟล์', href: '/profile' },
    { icon: <ArticleOutlined />, label: 'เรซูเม่', href: '/profile/resume' },
    {
      icon: <HistoryOutlined />,
      label: 'ประวัติการทำงาน',
      href: '/profile/history',
    },
  ]

  const MENU_ITEM_CASTING = [
    {
      icon: <AccountCircleOutlined />,
      label: 'โปรไฟล์',
      href: `/profile/${user?.userId}`,
    },
    {
      icon: <HistoryOutlined />,
      label: 'ประวัติการทำงาน',
      href: `/profile/${user?.userId}/history`,
    },
  ]

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'flex-start',
        gap: '3.5vw',
        marginTop: '3rem',
      }}
    >
      {/* Place holder not implement in this sprint */}
      {user?.type === UserType.ACTOR && (
        <MenuBar
          sx={{ width: '20vw' }}
          menu={MENU_ITEM_ACTOR}
          focus="ประวัติการทำงาน"
        />
      )}
      {user?.type === UserType.CASTING && (
        <MenuBar
          sx={{ width: '20vw' }}
          menu={MENU_ITEM_CASTING}
          focus="ประวัติการทำงาน"
        />
      )}
      <JobContainer>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {!job && (
            <div
              className="loader"
              key={0}
              style={{
                display: 'flex',
                alignItems: 'column',
                justifyContent: 'center',
              }}
            >
              <CircularProgress color="primary" />
            </div>
          )}
          {job && (
            <JobCardContainer
              isHistory={true}
              jobs={job}
              maxPage={job.length}
            />
          )}
        </div>
      </JobContainer>
      <PlaceFill />
    </div>
  )
}

export default withGuard(HistoryPage, 'verified', [
  UserType.ACTOR,
  UserType.CASTING,
])
