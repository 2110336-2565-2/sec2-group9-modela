import BaseFooter from './JobCardFooter/BaseFooter'
import BaseHeader from './JobCardHeader/BaseHeader'
import ReportHeader from './JobCardHeader/ReportHeader'

export const JobCardComponents = {
  base: {
    Header: BaseHeader,
    Footer: BaseFooter,
  },
  report: {
    Header: ReportHeader,
    Footer: BaseFooter,
  },
}
