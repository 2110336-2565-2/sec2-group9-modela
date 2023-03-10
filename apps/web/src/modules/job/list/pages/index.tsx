import { UserType } from '@modela/dtos'
import { useUser } from 'common/context/UserContext'
import withGuard from 'common/hoc/withGuard'

import ActorCastingPage from './ActorCastingPage'
import AdminPage from './AdminPage'

const JobList = () => {
  const { user } = useUser()
  return (
    <div>
      {(user?.type === UserType.ACTOR || user?.type === UserType.CASTING) && (
        <ActorCastingPage />
      )}
      {user?.type === UserType.ADMIN && <AdminPage />}
    </div>
  )
}

export default withGuard(JobList, 'verified', [
  UserType.ACTOR,
  UserType.CASTING,
  UserType.ADMIN,
])
