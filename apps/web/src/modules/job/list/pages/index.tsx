import { UserType } from '@modela/database'
import withGuard from 'common/hoc/withGuard'

import ActorCastingPage from '../components/ActorCastingPage'

const JobList = () => {
  return <ActorCastingPage />
}

export default withGuard(JobList, 'verified', [
  UserType.ACTOR,
  UserType.CASTING,
  UserType.ADMIN,
])
