//import Header from 'common/components/header'
import { GetJobCardWithMaxPageDto } from '@modela/dtos'
import { Typography } from '@mui/material'
import { apiClient } from 'common/utils/api'
import React, { useEffect, useState } from 'react'

import FilterContainer from '../components/FilterContainer'
import JobCardContainer from '../components/JobCardContainer'
import NotiCardContainer from '../components/NotiCardContainer'
import SearchBox from '../components/SearchBox'

//import Card from '../components/card'

export default function JobList() {
  const [job, setJob] = useState<GetJobCardWithMaxPageDto>()
  const fetchData = async () => {
    try {
      const res = (await apiClient.get('/job?limit=20&page=1'))
        .data as GetJobCardWithMaxPageDto
      console.log(res)
      setJob(res)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchData()
    console.log('SSSS')
  }, [])

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
            {job && <JobCardContainer {...job} />}
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
