import { UserType } from '@modela/dtos'
import withGuard from 'common/hoc/withGuard'
import Jobform from 'modules/job/components/Jobform'

const PostJobPage = () => <Jobform />

export default withGuard(PostJobPage, [UserType.CASTING])
