import {
  ActorInfoWithReasonDto,
  CastingInfoWithReasonDto,
  UserType,
} from '@modela/dtos'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import React, { useEffect } from 'react'

const useInitialData = (type: UserType) => {
  const [initialData, setInitialData] = React.useState<
    ActorInfoWithReasonDto | CastingInfoWithReasonDto | null
  >(null)

  const { handleError } = useErrorHandler()

  useEffect(() => {
    const fetchActorData = async () => {
      try {
        const res = await apiClient.get<ActorInfoWithReasonDto>('/info/actor')
        setInitialData(res.data)
      } catch (err) {
        handleError(err)
      }
    }

    const fetchCastingData = async () => {
      try {
        const res = await apiClient.get<CastingInfoWithReasonDto>(
          '/info/casting',
        )
        setInitialData(res.data)
      } catch (err) {
        handleError(err)
      }
    }

    if (type === UserType.ACTOR) {
      fetchActorData()
    } else if (type === UserType.CASTING) {
      fetchCastingData()
    }
  }, [handleError, type])

  return initialData
}

export default useInitialData
