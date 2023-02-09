import { UserType } from '@modela/dtos'
import withGuard from 'common/hoc/withGuard'
import JobForm from 'modules/job/components/JobForm'

const PostJobPage = () => <JobForm />

export default withGuard(PostJobPage, [UserType.CASTING])
