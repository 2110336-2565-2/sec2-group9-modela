import { GetReportsDto } from '@modela/dtos'
import { Divider, Link, Typography } from '@mui/material'

import ReportDetail from './components/ReportDetail'
import {
  AcceptButton,
  ButtonContainer,
  CardContainer,
  RejectButton,
} from './styled'

const JobReportCard = (prop: GetReportsDto) => {
  const { jobTitle, jobId, reports } = prop

  return (
    <CardContainer>
      <Typography variant="h5" textAlign="center">
        รายละเอียดปัญหา
      </Typography>
      <Divider />
      <Typography variant="body1">
        {'งานที่ได้รับการแจ้งปัญหา: '}
        <Link
          variant="body1"
          color="primary"
          sx={{ cursor: 'pointer', textDecoration: 'none' }}
          href={`/job/${jobId}`}
        >
          {jobTitle}
        </Link>
      </Typography>
      <Typography variant="body1">มีการแจ้งปัญหา 2 ครั้ง</Typography>
      {reports.map((report) => (
        <ReportDetail key={report.reportId} {...report} />
      ))}
      <ButtonContainer>
        <RejectButton>ยกเลิกการแจ้งปัญหาทั้งหมด</RejectButton>
        <AcceptButton>ยืนยันยกเลิกงาน</AcceptButton>
      </ButtonContainer>
    </CardContainer>
  )
}

export default JobReportCard
