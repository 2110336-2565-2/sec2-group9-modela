import { UserType } from '@modela/dtos'
import {
  Button,
  CircularProgress,
  Divider,
  Link,
  Typography,
} from '@mui/material'
import withGuard from 'common/hoc/withGuard'

import SelectResume from '../components/SelectResume'
import useResume from './hooks'
import { CardContainer, RootContainer } from './styled'

const JobApplyPage = () => {
  const { jobId, jobTitle, handleSuccess, loading, resumes, Id, setId } =
    useResume()
  if (loading) return <CircularProgress />

  return (
    <RootContainer>
      <CardContainer>
        <Typography variant="h6" textAlign="center">
          สมัครงาน
        </Typography>
        <Divider />
        <Typography variant="body1">
          {'งานที่ต้องการสมัคร: '}
          <Link
            variant="body1"
            color="primary"
            sx={{ cursor: 'pointer', textDecoration: 'none' }}
            href={`/job/${jobId}`}
          >
            {jobTitle}
          </Link>
        </Typography>
        <SelectResume resumes={resumes} Id={Id} setId={setId}></SelectResume>
        <Button
          sx={{ borderRadius: '12px', alignSelf: 'center' }}
          size="large"
          variant="contained"
          type="submit"
          onClick={handleSuccess}
        >
          ยืนยันสมัครงาน
        </Button>
      </CardContainer>
    </RootContainer>
  )
}

export default withGuard(JobApplyPage, 'verified', [UserType.ACTOR])
