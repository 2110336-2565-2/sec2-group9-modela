import { UserType } from '@modela/database'
import React, { useEffect } from 'react'

const useInitialData = (type: UserType) => {
  // TODO fix this
  const [initialData, setInitialData] = React.useState<{
    reason: string
    data: any
  } | null>(null)

  useEffect(() => {
    setTimeout(() => {
      if (type === UserType.CASTING)
        setInitialData({
          reason: 'Initial Data Casting',
          data: {},
        })
      else
        setInitialData({
          reason: 'Initial Data Actor',
          data: {},
        })
    }, 1000)
  }, [type])

  return initialData
}

export default useInitialData
