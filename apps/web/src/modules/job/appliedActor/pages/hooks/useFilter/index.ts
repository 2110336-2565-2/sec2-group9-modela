import { ApplicationStatus } from '@modela/database'
import useNavbarSearch from 'common/hooks/useNavbarSearch'
import useSwitch from 'common/hooks/useSwitch'
import { useCallback, useEffect, useState } from 'react'
import React from 'react'
import { useForm } from 'react-hook-form'

import { ActorQuery } from '../../types'

const useFilter = () => {
  const [query, setQuery] = useState<{
    name?: string
    status?: ApplicationStatus[]
  }>({
    status: [ApplicationStatus.PENDING],
  })

  const modal = useSwitch()
  useNavbarSearch(modal.open)

  const { control, watch, handleSubmit } = useForm<ActorQuery>({
    criteriaMode: 'all',
    defaultValues: {
      [ApplicationStatus.PENDING]: true,
      [ApplicationStatus.REJECTED]: false,
      [ApplicationStatus.OFFER_SENT]: false,
      [ApplicationStatus.OFFER_ACCEPTED]: false,
      [ApplicationStatus.OFFER_REJECTED]: false,
    },
  })

  const onSubmit = useCallback(
    (event?: React.FormEvent) => {
      event?.preventDefault()
      handleSubmit((value) => {
        console.log(value)
        const status = Object.values(ApplicationStatus).filter(
          (status) => value[status],
        )
        console.log({ name: value.name, status })
        setQuery({ name: value.name, status })
      })()
    },
    [handleSubmit],
  )

  // for deep compare in use effect dependency
  const watchField = JSON.stringify(watch(Object.values(ApplicationStatus)))

  useEffect(() => {
    onSubmit()
  }, [watchField, onSubmit])

  return { modal, onSubmit, control, query }
}

export default useFilter
