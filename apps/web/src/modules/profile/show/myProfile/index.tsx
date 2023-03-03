import { UserType } from '@modela/dtos'
import { AccountCircleOutlined, ArticleOutlined } from '@mui/icons-material'
import { CircularProgress } from '@mui/material'
import MenuBar from 'common/components/MenuBar'
import withGuard from 'common/hoc/withGuard'
import useNavbarFocus from 'common/hooks/useNavbarFocus'
import React from 'react'

import ProfileInfo from '../components/ActorProfileInfo'
import useActorProfile from './hooks/useActorProfile'
import { CardContainer, PlaceFill, RootContainer } from './styled'

const ActorProfile = () => {
  const MENU_ITEM = [
    { icon: <AccountCircleOutlined />, label: 'โปรไฟล์', href: '/profile' },
    { icon: <ArticleOutlined />, label: 'เรซูเม่', href: '/blog' },
  ]
  useNavbarFocus('profile')
  const { profile, isOpen, user } = useActorProfile()
  return (
    <RootContainer>
      <MenuBar sx={{ width: '17vw' }} menu={MENU_ITEM} focus="โปรไฟล์" />
      <CardContainer variant="outlined">
        {isOpen ? (
          <CircularProgress />
        ) : (
          <ProfileInfo isOwn={true} {...user} {...profile} />
        )}
      </CardContainer>
      <PlaceFill />
    </RootContainer>
  )
}

export default withGuard(ActorProfile, 'verified', [UserType.ACTOR])
