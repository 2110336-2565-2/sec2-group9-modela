import ActorProfileInfo from 'modules/profile/show/components/ActorProfileInfo'
import React from 'react'

import { CardContainer, RootContainer } from './styled'
import { ActorProfilePageProps } from './types'

const ActorProfilePage = (props: ActorProfilePageProps) => {
  const { profile, userId } = props
  return (
    <RootContainer>
      <CardContainer variant="outlined">
        <ActorProfileInfo isOwn={false} {...profile} userId={userId} />
      </CardContainer>
    </RootContainer>
  )
}

export default ActorProfilePage
