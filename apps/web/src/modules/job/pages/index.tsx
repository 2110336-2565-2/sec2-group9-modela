import Header from 'common/components/Header'
import { useRouter } from 'next/router'
import React from 'react'

import Card from '../components/Card'

export default function JobDetail() {
  const router = useRouter()
  const { jid } = router.query

  return (
    <>
      <Header />
      <p>test: {jid}</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '3rem',
        }}
      >
        {/* TODO: remove mock data */}
        <Card
          castingImage=""
          title="job"
          companyName="company name"
          description="lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet"
          role="ติวเตอร์ พี่เลี้ยง"
          gender="หญิง"
          actorCount={5}
          minAge={15}
          maxAge={20}
          wage={5000}
          dueDate={new Date()}
          shootingList={[
            {
              location: 'bangkok',
              startDate: new Date(),
              endDate: new Date(),
              startTimes: new Date(),
              endTimes: new Date(),
            },
          ]}
        />
      </div>
    </>
  )
}
