import { UserType } from '@modela/dtos'
import { Add } from '@mui/icons-material'
import { Button, CircularProgress, Typography } from '@mui/material'
import { useUser } from 'common/context/UserContext'
import withGuard from 'common/hoc/withGuard'
import useNavbarSearch from 'common/hooks/useNavbarSearch'
import FilterContainer from 'modules/job/list/components/FilterContainer'
import FilterMobileContainer from 'modules/job/list/components/FilterMobileContainer'
import JobCardContainer from 'modules/job/list/components/JobCardContainer'
import SearchBox from 'modules/job/list/components/SearchBox'
import React, { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroller'

import NotiCardContainer from './components/NotiCardContainer'
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
    state,
    setState,
    isOpen,
    open,
    close,
    isDesktop,
  } = useJobListData()
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
          display: isOpen && !isDesktop ? 'none' : 'flex',
        }}
      >
        <SearchContainer>
          <SearchBox
            state={state}
            filterData={filterData}
            setState={setState}
            labels={'?????????????????????????????????????????????'}
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
              href="/job/post"
              variant="contained"
              sx={{
                borderRadius: '12px',
                width: '100%',
                maxWidth: '250px',
                marginLeft: '1rem',
                fontSize: '16px',
              }}
              startIcon={<Add />}
            >
              ????????????????????????
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

export default withGuard(JobList, 'verified', [
  UserType.ACTOR,
  UserType.CASTING,
])
