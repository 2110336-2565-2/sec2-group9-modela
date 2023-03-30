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
import useNavbarSearch from 'common/hooks/useNavbarSearch'
import JobCardContainer from 'modules/job/list/components/JobCardContainer'
import React, { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroller'

import useJobData from './hooks/useJobData'
import { JobContainer } from './styled'
const JobList = () => {
  const { job, hasMore, fetchData, isOpen, open, isDesktop } = useJobData()
  const { user } = useUser()
  useNavbarSearch(
    useCallback(() => {
      open()
    }, [open]),
  )
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
      }}
    >
      {/* Place holder not implement in this sprint */}
      {user?.type === UserType.ACTOR && (
        <MenuBar
          sx={{ width: '17vw' }}
          menu={MENU_ITEM_ACTOR}
          focus="โปรไฟล์"
        />
      )}
      {user?.type === UserType.CASTING && (
        <MenuBar
          sx={{ width: '17vw' }}
          menu={MENU_ITEM_CASTING}
          focus="โปรไฟล์"
        />
      )}
      <JobContainer
        sx={{
          display: isOpen && !isDesktop ? 'none' : 'flex',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <InfiniteScroll
            loadMore={fetchData}
            hasMore={hasMore}
            loader={
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
            }
          >
            {job && <JobCardContainer {...job} />}
          </InfiniteScroll>
        </div>
      </JobContainer>
    </div>
  )
}

export default withGuard(JobList, 'verified', [
  UserType.ACTOR,
  UserType.CASTING,
])
