import ActorProfileInfo from 'modules/profile/show/components/ActorProfileInfo'
import React from 'react'

import { CardContainer, RootContainer } from './styled'
import { ActorProfilePageProps } from './types'

const ActorProfilePage = (props: ActorProfilePageProps) => {
  const { profile, userId } = props
  return (
    <RootContainer>
<<<<<<< HEAD
=======
      <MenuBar sx={{ width: '20vw' }} menu={MENU_ITEM_ACTOR} focus="โปรไฟล์" />
>>>>>>> aac94e18 (fix: menuBar to 20vw / let => const)
      <CardContainer variant="outlined">
        <ActorProfileInfo isOwn={false} {...profile} userId={userId} />
      </CardContainer>
    </RootContainer>
  )
}

export default ActorProfilePage
