import { UserType } from '@modela/database'
import { ActorInfoWithReasonDto } from '@modela/dtos'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import React, { useEffect } from 'react'

const useInitialData = (type: UserType) => {
  const [initialData, setInitialData] =
    React.useState<ActorInfoWithReasonDto | null>(null)
  const { handleError } = useErrorHandler()

  useEffect(() => {
    const fetchActorData = async () => {
      const res = await apiClient.get('/info/actor')
      setInitialData(res.data)
    }

    try {
      if (type === UserType.ACTOR) {
        fetchActorData()
      }
    } catch (err) {
      handleError(err)
    }
  }, [handleError, type])

  return initialData
}

export default useInitialData
