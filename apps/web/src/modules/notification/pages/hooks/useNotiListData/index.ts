/* eslint-disable react-hooks/exhaustive-deps */
import { GetNotificationDto, NotificationType } from '@modela/dtos'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

const useNotiListData = () => {
  const [notiType, setNotiType] = useState<NotificationType>()
  const { handleError } = useErrorHandler()
  const [noti, setNoti] = useState<GetNotificationDto>()
  const router = useRouter()

  const fetchData = useCallback(async () => {
    try {
      const res = (
        await apiClient.get<GetNotificationDto>(`/notifications`, {
          params: {
            limit: 5,
            page: 1,
            type: notiType,
          },
        })
      ).data
      setNoti((prevNotis) => ({
        ...prevNotis,
        notifications: [
          ...(prevNotis?.notifications || []),
          ...res.notifications,
        ],
        maxPage: res.maxPage,
      }))
    } catch (err) {
      handleError(err)
    }
  }, [handleError])

  useEffect(() => {
    fetchData()
  }, [router.isReady])

  return { fetchData, setNotiType, notiType, noti }
}

export default useNotiListData
