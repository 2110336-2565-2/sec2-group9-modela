import { UserType } from '@modela/dtos'
import { useUser } from 'common/context/UserContext'
import withGuard from 'common/hoc/withGuard'
import useNavbarSearch from 'common/hooks/useNavbarSearch'
import { useCallback } from 'react'

import NotiCardContainer from '../components/NoticardContainer'
import { notiHolder } from './placeholder'
import { FilterBoxContainer, NotiContainer, PlaceFill } from './styled'

const NotificationPage = () => {
  const { user } = useUser()
  useNavbarSearch(
    useCallback(() => {
      console.log('TEST')
    }, []),
  )
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'flex-start',
        gap: '3.5vw',
      }}
    >
      <PlaceFill />
      <NotiContainer>
        <NotiCardContainer
          maxPage={1}
          userType={user?.type}
          noti={notiHolder}
        />
      </NotiContainer>
      <FilterBoxContainer></FilterBoxContainer>
    </div>
  )
}

export default withGuard(NotificationPage, 'verified', [
  UserType.ACTOR,
  UserType.CASTING,
])
