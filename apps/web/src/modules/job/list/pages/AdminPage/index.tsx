import { UserType } from '@modela/dtos'
import { CircularProgress } from '@mui/material'
import withGuard from 'common/hoc/withGuard'
import useNavbarFocus from 'common/hooks/useNavbarFocus'
import useNavbarSearch from 'common/hooks/useNavbarSearch'
import FilterContainer from 'modules/job/list/components/FilterContainer'
import FilterMobileContainer from 'modules/job/list/components/FilterMobileContainer'
import JobCardContainer from 'modules/job/list/components/JobCardContainer'
import SearchBox from 'modules/job/list/components/SearchBox'
import React, { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroller'

import useJobListData from './hooks/useJobListData'
import {
  FilterBoxContainer,
  JobContainer,
  PlaceFill,
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
  useNavbarSearch(
    useCallback(() => {
      open()
    }, [open]),
  )

  useNavbarFocus('jobs')

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '3.5vw',
      }}
    >
      <PlaceFill />
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
          <FilterContainer
            state={state}
            setState={setState}
            isTitle={false}
            filterData={filterData}
            isAdmin={true}
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
          isAdmin={true}
        />
      )}
    </div>
  )
}

export default withGuard(JobList, 'verified', [UserType.ADMIN])
