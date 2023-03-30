import CastingProfileInfo from 'modules/profile/show/components/CastingProfileInfo'
import React from 'react'

import { CardContainer, RootContainer } from './styled'
import { CastingProfilePageProps } from './types'

const CastingProfilePage = (props: CastingProfilePageProps) => {
  const { profile, userId } = props
  return (
    <RootContainer>
      <CardContainer variant="outlined">
        <CastingProfileInfo isOwn={false} {...profile} userId={userId} />
      </CardContainer>
    </RootContainer>
  )
}

export default CastingProfilePage
