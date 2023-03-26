import { UserType } from '@modela/dtos'
import {
  CircularProgress,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material'
import withGuard from 'common/hoc/withGuard'
import JobMenu from 'modules/job/components/JobMenu'
import React from 'react'

import ActorCard from '../components/ActorCard'
import ActorFilter from '../components/ActorFilter'
import ActorFilterModal from '../components/ActorFilterModal'
import SearchField from '../components/SearchField'
import useActorData from './hooks/useActorData'
import useFilter from './hooks/useFilter'
import { CardsContainer, PageContainer, TabletContainer } from './styled'

const AppliedActorPage = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const { modal, control, onSubmit, query } = useFilter()
  const { actorData, handleSetJobStatus, jobStatus } = useActorData(query)

  if (isMobile && modal.isOpen)
    return <ActorFilterModal onClose={modal.close} control={control} />

  return (
    <PageContainer onSubmit={onSubmit}>
      <JobMenu focus="actor" setStatus={handleSetJobStatus} />
      <TabletContainer>
        <CardsContainer>
          {!isMobile && <SearchField control={control} onSubmit={onSubmit} />}
          {actorData ? (
            actorData.length === 0 ? (
              <Typography color="#00000061">ไม่พบนักแสดง</Typography>
            ) : (
              actorData.map((actor) => (
                <ActorCard
                  key={actor.applicationId}
                  jobStatus={jobStatus}
                  {...actor}
                />
              ))
            )
          ) : (
            <CircularProgress />
          )}
        </CardsContainer>
        {!isMobile && <ActorFilter control={control} />}
      </TabletContainer>
    </PageContainer>
  )
}

export default withGuard(AppliedActorPage, 'verified', [UserType.CASTING])
