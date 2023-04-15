import ApplyFooter from './JobCardFooter/ApplyFooter'
import BaseFooter from './JobCardFooter/BaseFooter'
import CancelApplyFooter from './JobCardFooter/CancelApplyFooter'
import ApplicationStatusHeader from './JobCardHeader/ApplicationStatusHeader'
import BaseHeader from './JobCardHeader/BaseHeader'
import EditHeader from './JobCardHeader/EditHeader'
import ReportedHeader from './JobCardHeader/ReportedHeader'
import ReportHeader from './JobCardHeader/ReportHeader'

export const JobCardComponents = {
  base: {
    Header: BaseHeader,
    Footer: BaseFooter,
  },
  reportWithApply: {
    Header: ReportHeader,
    Footer: ApplyFooter,
  },
  edit: {
    Header: EditHeader,
    Footer: BaseFooter,
  },
  reported: {
    Header: ReportedHeader,
    Footer: BaseFooter,
  },
  applied: {
    Header: ApplicationStatusHeader,
    Footer: CancelApplyFooter,
  },
}
