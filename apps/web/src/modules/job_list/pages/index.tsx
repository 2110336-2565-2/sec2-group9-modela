//import Header from 'common/components/header'
import { Typography } from '@mui/material'
import React from 'react'

import FilterContainer from '../components/FilterContainer'
import JobCardContainer from '../components/JobCardContainer'
import NotiCardContainer from '../components/NotiCardContainer'
import SearchBox from '../components/SearchBox'

//import Card from '../components/card'

export default function JobList() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
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
            justifyContent: 'flex-start',
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
            <JobCardContainer
              cardData={[
                {
                  title: 'Agoda offer',
                  companyName: 'Agoda',
                  description: 'Intern',
                  castingImage: '',
                  gender: 'male',
                  actorCount: 3,
                  wage: 2500,
                  dueDate: new Date(),
                },
                {
                  title: 'Lineman offer',
                  companyName: 'LMWN',
                  description: 'Frontend',
                  castingImage: '',
                  gender: 'Female',
                  actorCount: 4,
                  wage: 5600,
                  dueDate: new Date(),
                },
              ]}
            />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
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
