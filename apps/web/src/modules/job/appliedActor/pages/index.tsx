import { UserType } from '@modela/database'
import withGuard from 'common/hoc/withGuard'
import JobMenu from 'modules/job/components/JobMenu'
import React from 'react'

const AppliedActorPage = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <JobMenu focus="actor" />
    </div>
  )
}

export default withGuard(AppliedActorPage, 'verified', [UserType.CASTING])
