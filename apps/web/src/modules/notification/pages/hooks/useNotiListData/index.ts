/* eslint-disable react-hooks/exhaustive-deps */
import { GetNotificationDto, NotificationType } from '@modela/dtos'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import { useCallback, useEffect, useRef, useState } from 'react'

import { initialINotiFilter, INotiFilter } from '../../types'

const useNotiListData = () => {
  const [state, setState] = useState<INotiFilter>(initialINotiFilter)
  const [search, setSearch] = useState<NotificationType[]>()
  const { handleError } = useErrorHandler()
  const [noti, setNoti] = useState<GetNotificationDto>()
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const pageControl = useRef(1)

  const filterData = useCallback(async (state: INotiFilter) => {
    let newType: NotificationType[] = []
    console.log('State :', state)
    if (state.acceptCheck) {
      newType.push(NotificationType.ACCEPT_OFFER)
    }
    if (state.rejectCheck) {
      newType.push(NotificationType.REJECT_OFFER)
    }
    if (state.cancelCheck) {
      newType.push(NotificationType.CANCEL_JOB)
    }
    if (state.receiveCheck) {
      newType.push(NotificationType.RECEIVE_OFFER)
    }
    if (state.appRefundCheck) {
      newType.push(NotificationType.APPROVE_REFUND)
    }
    if (state.rejectRefundCheck) {
      newType.push(NotificationType.REJECT_REFUND)
    }
    console.log('newType: ', newType)
    setSearch(newType)

    setNoti((prevNotis) => ({
      ...prevNotis,
      notifications: [],
      maxPage: 1,
    }))
    console.log('???')
    setPage(1)
    pageControl.current = 1

    setHasMore(true)
  }, [])

  const fetchData = useCallback(async () => {
    console.log('Page : ', page)
    console.log('PageControl : ', pageControl.current)
    try {
      if (pageControl.current <= page) {
        pageControl.current = page + 1
        const res = (
          await apiClient.get<GetNotificationDto>(`/notifications`, {
            params: {
              limit: 5,
              page: page,
              type: search,
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
        setHasMore(res.maxPage > page)
      }
      setPage((prev) => prev + 1)
    } catch (err) {
      handleError(err)
    }
  }, [page, search])

  useEffect(() => {
    filterData(state)
  }, [
    state.acceptCheck,
    state.appRefundCheck,
    state.cancelCheck,
    state.receiveCheck,
    state.rejectCheck,
    state.rejectRefundCheck,
  ])

  return { fetchData, state, setState, noti, filterData, hasMore }
}

export default useNotiListData
