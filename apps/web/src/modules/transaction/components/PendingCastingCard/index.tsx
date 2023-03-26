import { JobStatus } from '@modela/database'
import JobCardHeader from 'modules/job/components/JobCardHeader'

import { CardContainer } from './styled'
import { PendingCastingCardProps } from './types'

const PendingCastingCard = (props: PendingCastingCardProps) => {
  const {
    title,
    firstName,
    middleName,
    lastName,
    jobId,
    castingId,
    companyName,
  } = props
  const castingName = `${firstName} ${middleName || ''} ${lastName}`

  return (
    <CardContainer>
      <JobCardHeader
        title={castingName}
        companyName={companyName}
        jobCastingImageUrl={''}
        status={JobStatus.SELECTION_ENDED}
        jobId={jobId}
        castingId={castingId}
        castingName={castingName}
      />
      {title}
    </CardContainer>
  )
}

export default PendingCastingCard
