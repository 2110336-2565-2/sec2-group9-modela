/* eslint-disable react-hooks/exhaustive-deps */
import { GetActorProfileDto, GetProfileForViewingDto } from '@modela/dtos'
import { useUser } from 'common/context/UserContext'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import useSwitch from 'common/hooks/useSwitch'
import { apiClient } from 'common/utils/api/axiosInstance'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const useActorProfile = () => {
  const router = useRouter()
  const [profile, setProfile] = useState<GetActorProfileDto>()
  const { isOpen, open, close } = useSwitch()
  const { handleError } = useErrorHandler()
  const { user } = useUser()

  useEffect(() => {
    const fetchData = async () => {
      open()
      try {
        const res = (
          await apiClient.get<GetProfileForViewingDto>(
            '/profile/' + user?.userId,
          )
        ).data
        setProfile(res.data)
      } catch (err) {
        handleError(err)
      }
      close()
    }
    if (router.isReady) {
      fetchData()
    }
  }, [handleError, router.isReady])

  return { profile, isOpen, user }
}

export default useActorProfile
