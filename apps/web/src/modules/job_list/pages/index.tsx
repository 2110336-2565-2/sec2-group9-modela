//import Header from 'common/components/header'
import { GetJobCardWithMaxPageDto } from '@modela/dtos'
import { Typography } from '@mui/material'
import { apiClient } from 'common/utils/api'
import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'

import FilterContainer from '../components/FilterContainer'
import JobCardContainer from '../components/JobCardContainer'
import NotiCardContainer from '../components/NotiCardContainer'
import SearchBox from '../components/SearchBox'

//import Card from '../components/card'

export default function JobList() {
  const [job, setJob] = useState<GetJobCardWithMaxPageDto>()
  const [hasMore, setHasMore] = useState(true)
  const fetchData = async (page: number) => {
    try {
      const res = (await apiClient.get(`/job?limit=1&page=${page}`))
        .data as GetJobCardWithMaxPageDto
      console.log(res)
      setJob(res)
      setHasMore(res.maxPage < page)
    } catch (e) {
      console.log(e)
    }
  }

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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            paddingTop: '3rem',
            width: '20vw',
            gap: '1rem',
          }}
        >
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
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: '3rem',
            width: '40vw',
            gap: '1rem',
          }}
        >
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
              useWindow={false}
            >
              {job && <JobCardContainer {...job} />}
            </InfiniteScroll>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'right',
            paddingTop: '3rem',
            width: '14vw',
            gap: '1rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <FilterContainer />
          </div>
        </div>
      </div>
    </>
  )
}
