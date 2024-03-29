import { FC } from 'react'

import OfferAction from './JobCardAction/OfferAction'
import ApplyFooter from './JobCardFooter/ApplyFooter'
import BaseFooter from './JobCardFooter/BaseFooter'
import CancelApplyFooter from './JobCardFooter/CancelApplyFooter'
import RatingFooter from './JobCardFooter/RatingFooter'
import UnpaidFooter from './JobCardFooter/UnpaidFooter'
import ApplicationStatusHeader from './JobCardHeader/ApplicationStatusHeader'
import BaseHeader from './JobCardHeader/BaseHeader'
import EditHeader from './JobCardHeader/EditHeader'
import ReportedHeader from './JobCardHeader/ReportedHeader'
import ReportHeader from './JobCardHeader/ReportHeader'

export const JobCardComponents: {
  [key: string]: {
    Header: FC<any>
    Footer: FC<any>
    Action?: FC<any>
  }
} = {
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
    Action: OfferAction,
  },
  unpaid: {
    Header: BaseHeader,
    Footer: UnpaidFooter,
  },
  history: {
    Header: BaseHeader,
    Footer: RatingFooter,
  },
}
