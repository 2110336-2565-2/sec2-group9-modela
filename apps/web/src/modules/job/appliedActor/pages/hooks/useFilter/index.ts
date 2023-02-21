import { ApplicationStatus } from '@modela/database'
import useNavbarSearch from 'common/hooks/useNavbarSearch'
import useSwitch from 'common/hooks/useSwitch'
import { useForm } from 'react-hook-form'

import { ActorQuery } from '../../types'

const useFilter = () => {
  const modal = useSwitch()
  useNavbarSearch(modal.open)

  const { control, watch, getValues } = useForm<ActorQuery>({
    criteriaMode: 'all',
    defaultValues: {
      [ApplicationStatus.PENDING]: true,
      [ApplicationStatus.REJECTED]: false,
      [ApplicationStatus.OFFER_SENT]: false,
      [ApplicationStatus.OFFER_ACCEPTED]: false,
      [ApplicationStatus.OFFER_REJECTED]: false,
    },
  })

  watch((values) => {
    console.log(values)
  })

  return { modal, control, getValues }
}

export default useFilter
