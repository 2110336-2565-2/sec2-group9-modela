//import Header from 'common/components/header'
import { Typography } from '@mui/material'
import React from 'react'

import NotiCard from '../components/NotiCard'

//import Card from '../components/card'

export default function JobList() {
  return (
    <>
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            paddingTop: '3rem',
            width: '20vw',
            gap: '1vh',
          }}
        >
          <Typography variant="body1"> Unread notification </Typography>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1vh',
            }}
          >
            <NotiCard
              title="Intern offer"
              companyName="Fridge Agile"
              offer="100k perk year"
              castingImage=""
            />
            <NotiCard
              title="Intern offer"
              companyName="Fridge Agile"
              offer="200k perk year"
              castingImage=""
            />
          </div>
        </div>
      </div>
    </>
  )
}
