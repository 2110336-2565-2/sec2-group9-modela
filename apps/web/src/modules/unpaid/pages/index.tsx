import { UserType } from '@modela/dtos'
import { CircularProgress, Typography } from '@mui/material'
import withGuard from 'common/hoc/withGuard'
import useNavbarFocus from 'common/hooks/useNavbarFocus'
import React from 'react'

import UnpaidJobCard from '../components/UnpaidJobCard'
import useUnpaidJobData from '../hooks/useUnpaidJobData'
import { JobContainer } from './styled'
const UnpaidJobList = () => {
  const { unpaidJobData } = useUnpaidJobData()
  useNavbarFocus('unpaid')

  return (
    <div>
      <JobContainer>
        {unpaidJobData ? (
          unpaidJobData.length === 0 ? (
            <Typography
              sx={{ justifyContent: 'center', textAlign: 'center' }}
              variant="h4"
              color="#00000061"
            >
              ไม่พบงานที่พร้อมส่งหลักฐานการโอนเงิน
            </Typography>
          ) : (
            unpaidJobData.map((user) => (
              <UnpaidJobCard key={user.jobId} {...user} />
            ))
          )
        ) : (
          <CircularProgress />
        )}
      </JobContainer>
    </div>
  )
}

export default withGuard(UnpaidJobList, 'verified', [UserType.CASTING])
