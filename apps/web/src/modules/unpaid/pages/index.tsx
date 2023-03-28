import { UserType } from '@modela/dtos'
import { CircularProgress, Typography } from '@mui/material'
import withGuard from 'common/hoc/withGuard'
import useNavbarFocus from 'common/hooks/useNavbarFocus'
import SearchBox from 'modules/job/list/components/SearchBox'
import React from 'react'

import UnpaidJobCard from '../components/UnpaidJobCard'
import useUnpaidJobData from '../hooks/useUnpaidJobData'
import { JobContainer, SearchContainer } from './styled'
const UnpaidJobList = () => {
  const { unpaidJobData, filterData, state, setState } = useUnpaidJobData()
  useNavbarFocus('unpaid')

  return (
    <div>
      <SearchContainer>
        <SearchBox
          state={state}
          filterData={filterData}
          setState={setState}
          labels={'ค้นหางานที่ต้องการโอนเงิน'}
        />
      </SearchContainer>
      <JobContainer>
        {unpaidJobData ? (
          unpaidJobData.length === 0 ? (
            <Typography variant="h4" color="#00000061">
              ไม่พบงานที่พร้อมส่งหลักฐานการโอนเงิน
            </Typography>
          ) : (
            unpaidJobData.map((user) => (
              <UnpaidJobCard key={user.castingId} {...user} />
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
