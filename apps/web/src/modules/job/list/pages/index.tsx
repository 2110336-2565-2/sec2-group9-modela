import { UserType } from '@modela/database'
import { Add } from '@mui/icons-material'
import { Button, CircularProgress, Typography } from '@mui/material'
import { useUser } from 'common/context/UserContext'
import withGuard from 'common/hoc/withGuard'
import useNavbarSearch from 'common/hooks/useNavbarSearch'
import useSwitch from 'common/hooks/useSwitch'
import React, { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroller'

import FilterContainer from '../components/FilterContainer'
import FilterMobileContainer from '../components/FilterMobileContainer'
import JobCardContainer from '../components/JobCardContainer'
import NotiCardContainer from '../components/NotiCardContainer'
import SearchBox from '../components/SearchBox'
import useJobListData from './hooks/useJobListData'
import { notiHolder } from './placeholder'
import {
  FilterBoxContainer,
  JobContainer,
  NotiContainer,
  SearchContainer,
} from './styled'
const JobList = () => {
  const {
    job,
    hasMore,
    fetchData,
    filterData,
    createPostPage,
    state,
    setState,
  } = useJobListData()
  const { isOpen, open, close } = useSwitch()
  const { user } = useUser()
  useNavbarSearch(
    useCallback(() => {
      open()
    }, [open]),
  )

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
      <NotiContainer>
        <Typography variant="body1"> Unread notification </Typography>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <NotiCardContainer cardData={notiHolder} />
        </div>
      </NotiContainer>

      <JobContainer
        sx={{
          display: isOpen ? 'none' : 'flex',
        }}
      >
        <SearchContainer>
          <SearchBox
            state={state}
            filterData={filterData}
            setState={setState}
            labels={'ค้นหางานทั้งหมด'}
          />
        </SearchContainer>

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
      <FilterBoxContainer>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {user?.type === UserType.CASTING && (
            <Button
              onClick={createPostPage}
              variant="contained"
              sx={{
                borderRadius: '12px',
                width: '75%',
                marginLeft: '1rem',
                fontSize: '16px',
              }}
              startIcon={<Add />}
            >
              สร้างโพสต์
            </Button>
          )}
          <FilterContainer
            state={state}
            setState={setState}
            isTitle={false}
            filterData={filterData}
          />
        </div>
      </FilterBoxContainer>

      {isOpen && (
        <FilterMobileContainer
          state={state}
          setState={setState}
          isFilterShow={isOpen}
          closeFilterPage={close}
          filterData={filterData}
        />
      )}
    </div>
  )
}

export default withGuard(JobList, [UserType.ACTOR, UserType.CASTING])
