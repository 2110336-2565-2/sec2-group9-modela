import { UserType } from '@modela/dtos'
import { useUser } from 'common/context/UserContext'
import withGuard from 'common/hoc/withGuard'

import EditCastingProfile from '../casting'

const EditProfilePage = () => {
  const { user } = useUser()
  if (user?.type === UserType.CASTING) return <EditCastingProfile />
  return <>Actor Edit Page</>
}

export default withGuard(EditProfilePage, 'verified', [
  UserType.ACTOR,
  UserType.CASTING,
])
