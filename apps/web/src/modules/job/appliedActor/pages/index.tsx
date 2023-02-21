import { UserType } from '@modela/database'
import { CircularProgress, Theme, useMediaQuery } from '@mui/material'
import withGuard from 'common/hoc/withGuard'
import JobMenu from 'modules/job/components/JobMenu'
import React from 'react'

import ActorCard from '../components/ActorCard'
import ActorFilter from '../components/ActorFilter'
import ActorFilterModal from '../components/ActorFilterModal'
import useActorData from './hooks/useActorData'
import useFilter from './hooks/useFilter'
import { CardsContainer, PageContainer } from './styled'

const AppliedActorPage = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const { modal, control } = useFilter()
  const actorData = useActorData()

  if (isMobile && modal.isOpen)
    return <ActorFilterModal onClose={modal.close} control={control} />

  return (
    <PageContainer>
      <JobMenu focus="actor" />
      <CardsContainer>
        {actorData ? (
          actorData.map((actor) => <ActorCard key={actor.actorId} {...actor} />)
        ) : (
          <CircularProgress />
        )}
      </CardsContainer>
      {!isMobile && <ActorFilter control={control} />}
    </PageContainer>
  )
}

export default withGuard(AppliedActorPage, 'verified', [UserType.CASTING])
