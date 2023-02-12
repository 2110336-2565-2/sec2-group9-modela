import { CircularProgress, Typography } from '@mui/material'
import useNavbarSearch from 'common/hooks/useNavbarSearch'
import React, { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroller'

import FilterContainer from '../components/FilterContainer'
import FilterMobileContainer from '../components/FilterMobileContainer'
import JobCardContainer from '../components/JobCardContainer'
import NotiCardContainer from '../components/NotiCardContainer'
import SearchBox from '../components/SearchBox'
import useFilterData from './hooks/useFilterData'
import useJobListData from './hooks/useJobListData'
import useMobileStyle from './hooks/useMobileStyle'
import { notiHolder } from './placeholder'
import {
  FilterBoxContainer,
  JobContainer,
  NotiContainer,
  SearchContainer,
} from './styled'

export default function JobList() {
  const { job, hasMore, fetchData, filterData } = useJobListData()
  const { state, setState } = useFilterData()
  const { isFilterShow, setIsFilterShow, closeFilterPage } = useMobileStyle()
  useNavbarSearch(
    useCallback(() => {
      setIsFilterShow(true)
    }, []),
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
          display: isFilterShow ? 'none' : 'flex',
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
              <div className="loader" key={0}>
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
          <FilterContainer state={state} setState={setState} isTitle={false} />
        </div>
      </FilterBoxContainer>

      {isFilterShow && (
        <FilterMobileContainer
          state={state}
          setState={setState}
          isFilterShow={isFilterShow}
          closeFilterPage={closeFilterPage}
          filterData={filterData}
        />
      )}
    </div>
  )
}
