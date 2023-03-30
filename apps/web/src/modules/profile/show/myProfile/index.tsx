import { UserType } from '@modela/dtos'
import {
  AccountCircleOutlined,
  ArticleOutlined,
  HistoryOutlined,
} from '@mui/icons-material'
import { CircularProgress } from '@mui/material'
import MenuBar from 'common/components/MenuBar'
import withGuard from 'common/hoc/withGuard'
import useNavbarFocus from 'common/hooks/useNavbarFocus'
import React from 'react'

import ActorProfileInfo from '../components/ActorProfileInfo'
import CastingProfileInfo from '../components/CastingProfileInfo'
import useActorProfile from './hooks/useActorProfile'
import { CardContainer, PlaceFill, RootContainer } from './styled'

const MyProfilePage = () => {
  const MENU_ITEM_ACTOR = [
    { icon: <AccountCircleOutlined />, label: 'โปรไฟล์', href: '/profile' },
    { icon: <ArticleOutlined />, label: 'เรซูเม่', href: '/profile/resume' },
    {
      icon: <HistoryOutlined />,
      label: 'ประวัติการทำงาน',
      href: '/profile/history',
    },
  ]
  const MENU_ITEM_CASTING = [
    { icon: <AccountCircleOutlined />, label: 'โปรไฟล์', href: '/profile' },
  ]
  useNavbarFocus('profile')
  const { profile, isOpen, user } = useActorProfile()
  return (
    <RootContainer>
      {user?.type === UserType.ACTOR && (
        <MenuBar
          sx={{ width: '17vw' }}
          menu={MENU_ITEM_ACTOR}
          focus="โปรไฟล์"
        />
      )}
      {user?.type === UserType.CASTING && (
        <MenuBar
          sx={{ width: '17vw' }}
          menu={MENU_ITEM_CASTING}
          focus="โปรไฟล์"
        />
      )}
      <CardContainer variant="outlined">
        {isOpen ? (
          <CircularProgress />
        ) : (
          <>
            {user?.type === UserType.ACTOR && (
              <ActorProfileInfo isOwn={true} {...user} {...profile} />
            )}
            {user?.type === UserType.CASTING && (
              <CastingProfileInfo isOwn={true} {...user} {...profile} />
            )}
          </>
        )}
      </CardContainer>
      <PlaceFill />
    </RootContainer>
  )
}

export default withGuard(MyProfilePage, 'verified', [
  UserType.ACTOR,
  UserType.CASTING,
])
