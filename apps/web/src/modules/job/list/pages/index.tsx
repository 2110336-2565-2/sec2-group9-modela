import { Typography } from '@mui/material'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'

import FilterContainer from '../components/FilterContainer'
import JobCardContainer from '../components/JobCardContainer'
import NotiCardContainer from '../components/NotiCardContainer'
import SearchBox from '../components/SearchBox'
import useJobListData from './hooks/useJobListData'
import { FilterBoxContainer, JobContainer, NotiContainer } from './styled'

export default function JobList() {
  var { job, hasMore, fetchData } = useJobListData()

  return (
    <>
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
            <NotiCardContainer
              cardData={[
                {
                  title: 'Intern offer',
                  companyName: 'Fridge Agile',
                  offer: '100k perk year',
                  castingImage: '',
                },
                {
                  title: 'Software Engineer offer',
                  companyName: 'Apple Inc.',
                  offer: '150k perk year',
                  castingImage: '',
                },
                {
                  title: 'Data Scientist offer',
                  companyName: 'Google',
                  offer: '200k perk year',
                  castingImage: '',
                },
              ]}
            />
          </div>
        </NotiContainer>

        <JobContainer>
          <SearchBox />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <InfiniteScroll
              pageStart={0}
              loadMore={fetchData}
              hasMore={hasMore}
              loader={
                <div className="loader" key={0}>
                  Loading ...
                </div>
              }
            >
              {job ? <JobCardContainer {...job} /> : null}
            </InfiniteScroll>
          </div>
        </JobContainer>

        {/* Place holder to do in next task */}
        <FilterBoxContainer>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <FilterContainer />
          </div>
        </FilterBoxContainer>
      </div>
    </>
  )
}
