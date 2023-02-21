import { UserType } from '@modela/database'
import { useUser } from 'common/context/UserContext'
import withGuard from 'common/hoc/withGuard'

import ActorCastingPage from '../components/ActorCastingPage'

const JobList = () => {
  const { user } = useUser()
  return (
    <div>
      {(user?.type === UserType.ACTOR || user?.type === UserType.CASTING) && (
        <ActorCastingPage />
      )}
    </div>
  )
}

export default withGuard(JobList, 'verified', [
  UserType.ACTOR,
  UserType.CASTING,
  UserType.ADMIN,
])
