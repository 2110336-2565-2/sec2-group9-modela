import { UserType } from '@modela/dtos'
import { CircularProgress } from '@mui/material'
import { PageContainer } from 'common/components/Layout/styled'
import withGuard from 'common/hoc/withGuard'
import Jobform from 'modules/job/components/Jobform'

import useInitialValues from './hooks/useInitialValues'

const EditJobPage = () => {
  const initialValues = useInitialValues()
  if (!initialValues)
    return (
      <PageContainer>
        <CircularProgress />
      </PageContainer>
    )
  return <Jobform edit initialValues={initialValues} />
}

export default withGuard(EditJobPage, [UserType.CASTING])
