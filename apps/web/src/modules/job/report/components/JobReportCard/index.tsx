import { GetReportsDto } from '@modela/dtos'
import { Divider, Link, Typography } from '@mui/material'

import ReportDetail from './components/ReportDetail'
import useReport from './hooks/useReport'
import {
  AcceptButton,
  ButtonContainer,
  CardContainer,
  RejectButton,
} from './styled'

const JobReportCard = (prop: GetReportsDto) => {
  const { jobTitle, jobId, reports } = prop
  const { rejectJob, rejectReport } = useReport()

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
      <Typography variant="body1">
        มีการแจ้งปัญหา {reports.length} ครั้ง
      </Typography>
      {reports.map((report) => (
        <ReportDetail key={report.reportId} {...report} />
      ))}
      <ButtonContainer>
        <RejectButton onClick={() => rejectReport(jobId)}>
          ยกเลิกการแจ้งปัญหาทั้งหมด
        </RejectButton>
        <AcceptButton onClick={() => rejectJob(jobId)}>
          ยืนยันยกเลิกงาน
        </AcceptButton>
      </ButtonContainer>
    </CardContainer>
  )
}

export default JobReportCard
