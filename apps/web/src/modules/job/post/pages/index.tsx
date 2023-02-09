import { UserType } from '@modela/database'
import withGuard from 'common/hoc/withGuard'
import Jobform from 'modules/job/components/Jobform'

const PostJobPage = () => {
  return <Jobform />
}

export default withGuard(PostJobPage, [UserType.CASTING])
