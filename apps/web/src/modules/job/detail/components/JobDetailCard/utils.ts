import { UserType } from '@modela/database'
import ApplyFooter from 'common/components/JobCard/JobCardFooter/ApplyFooter'
import BaseFooter from 'common/components/JobCard/JobCardFooter/BaseFooter'
import BaseHeader from 'common/components/JobCard/JobCardHeader/BaseHeader'
import EditHeader from 'common/components/JobCard/JobCardHeader/EditHeader'
import ReportHeader from 'common/components/JobCard/JobCardHeader/ReportHeader'

export const getFooter = (userType: UserType) => {
  if (userType === UserType.ACTOR) return ApplyFooter
  return BaseFooter
}

export const getHeader = (userType: UserType) => {
  if (userType === UserType.ACTOR) return ReportHeader
  if (userType === UserType.CASTING) return EditHeader
  return BaseHeader
}
