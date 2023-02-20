import { Divider, Typography } from '@mui/material'

import ReportDetail from './components/ReportDetail'
import { ReportDetailProps } from './components/ReportDetail/type'
import { ButtonContainer, CardContainer, StyledButton } from './styled'

const JobReportCard = () => {
  const mockReport: ReportDetailProps[] = [
    {
      reporter: 'ธนพล สุขสวัสดิ์',
      reason: 'ไม่มีเครื่องเสียง',
    },
    {
      reporter: 'ธนพล สุขสวัสดิ์',
      reason: 'ไม่มีเครื่องเสียง',
    },
  ]

  return (
    <CardContainer>
      <Typography variant="h5" textAlign="center">
        รายละเอียดปัญหา
      </Typography>
      <Divider />
      <Typography variant="body1">งานที่ได้รับการแจ้งปัญหา</Typography>
      <Typography variant="body1">มีการแจ้งปัญหา 2 ครั้ง</Typography>
      {mockReport.map((report, idx) => (
        <ReportDetail key={idx} {...report} />
      ))}
      <ButtonContainer>
        <StyledButton sx={{ backgroundColor: '#66A373' }}>
          ยกเลิกการแจ้งปัญหาทั้งหมด
        </StyledButton>
        <StyledButton sx={{ backgroundColor: '#AA5B5B' }}>
          ยืนยันยกเลิกงาน
        </StyledButton>
      </ButtonContainer>
    </CardContainer>
  )
}

export default JobReportCard
