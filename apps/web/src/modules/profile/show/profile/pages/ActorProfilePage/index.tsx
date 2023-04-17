import { AccountCircleOutlined, HistoryOutlined } from '@mui/icons-material'
import MenuBar from 'common/components/MenuBar'
import ActorProfileInfo from 'modules/profile/show/components/ActorProfileInfo'
import React from 'react'

import { CardContainer, PlaceFill, RootContainer } from './styled'
import { ActorProfilePageProps } from './types'

const ActorProfilePage = (props: ActorProfilePageProps) => {
  const { profile, userId } = props
  const MENU_ITEM_ACTOR = [
    {
      icon: <AccountCircleOutlined />,
      label: 'โปรไฟล์',
      href: `/profile/${userId}`,
    },
    {
      icon: <HistoryOutlined />,
      label: 'ประวัติการทำงาน',
      href: `/profile/${userId}/history`,
    },
  ]
  return (
    <RootContainer>
      <MenuBar sx={{ width: '20vw' }} menu={MENU_ITEM_ACTOR} focus="โปรไฟล์" />
      <CardContainer variant="outlined">
        <ActorProfileInfo isOwn={false} {...profile} userId={userId} />
      </CardContainer>
      <PlaceFill />
    </RootContainer>
  )
}

export default ActorProfilePage
