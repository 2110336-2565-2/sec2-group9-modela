import { PendingUserDto, UpdateUserStatusDto, UserStatus } from '@modela/dtos'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const usePendingUserData = () => {
  const [pendingUserData, setPendingUserData] = useState<PendingUserDto[]>([])
  const [modalId, setModalId] = useState<number | null>(null)
  const [modalReason, setModalReason] = useState<string | null>(null)
  const { handleError } = useErrorHandler()

  const router = useRouter()

  const pendingFilter = () => {
    setPendingUserData((prev) =>
      prev.filter((user) => user.data.userId !== modalId),
    )
  }

  useEffect(() => {
    const fetchPendingUserData = async () => {
      try {
        const res = await apiClient.get<PendingUserDto[]>(`/users/pending`)
        setPendingUserData(res.data)
      } catch (err) {
        handleError(err)
      }
    }

    if (router.isReady) fetchPendingUserData()
  }, [handleError, router.isReady])

  const acceptUser = async () => {
    try {
      await apiClient.put<UpdateUserStatusDto>(
        `/users/${modalId}/verification`,
        {
          status: UserStatus.ACCEPTED,
          rejectedReason: '',
        },
      )
      pendingFilter()
    } catch (err) {
      handleError(err)
    }
  }

  const rejectUser = async () => {
    try {
      await apiClient.put<UpdateUserStatusDto>(
        `/users/${modalId}/verification`,
        {
          status: UserStatus.REJECTED,
          rejectedReason: modalReason,
        },
      )
      pendingFilter()
    } catch (err) {
      handleError(err)
    }
  }

  return { pendingUserData, rejectUser, acceptUser, setModalId, setModalReason }
}

export default usePendingUserData
