import { UserType } from '@modela/dtos'
import { useUser } from 'common/context/UserContext'
import withGuard from 'common/hoc/withGuard'

import NotiCardContainer from '../components/NoticardContainer'
import { notiHolder } from './placeholder'

const NotificationPage = () => {
  const { user } = useUser()
  return (
    <>
      <NotiCardContainer maxPage={1} userType={user?.type} noti={notiHolder} />
    </>
  )
}

export default withGuard(NotificationPage, 'verified', [
  UserType.ACTOR,
  UserType.CASTING,
])
