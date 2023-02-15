import { UserType } from '@modela/dtos'
import { CircularProgress } from '@mui/material'
import withGuard from 'common/hoc/withGuard'
import JobForm from 'modules/job/components/JobForm'

import useInitialValues from './hooks/useInitialValues'

const EditJobPage = () => {
  const initialValues = useInitialValues()

  if (!initialValues) return <CircularProgress sx={{ alignSelf: 'center' }} />

  return <JobForm edit initialValues={initialValues} />
}

export default withGuard(EditJobPage, [UserType.CASTING])
