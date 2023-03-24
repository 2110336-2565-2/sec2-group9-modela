import { UserType } from '@modela/dtos'
import withGuard from 'common/hoc/withGuard'

import NotiCardContainer from '../components/NoticardContainer'
import { notiHolder } from './placeholder'

const NotificationPage = () => {
  return (
    <>
      <NotiCardContainer maxPage={1} noti={notiHolder} />
    </>
  )
}

export default withGuard(NotificationPage, 'verified', [
  UserType.ACTOR,
  UserType.CASTING,
])
