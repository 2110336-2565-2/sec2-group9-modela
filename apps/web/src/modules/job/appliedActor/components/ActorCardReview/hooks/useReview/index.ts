import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import { MouseEvent, SyntheticEvent, useCallback, useState } from 'react'

const useReview = (actorId: number, rating?: number) => {
  const router = useRouter()
  const { jobId } = router.query

  const [score, setScore] = useState<number | null>(rating || 0)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(
    rating !== null && rating !== undefined,
  )
  const { handleError } = useErrorHandler()

  const handleScoreClick = useCallback(
    (event: SyntheticEvent, value: number | null) => {
      event.preventDefault()
      event.stopPropagation()
      setScore(value)
    },
    [],
  )

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      await apiClient.post(`/jobs/${jobId}/actors/${actorId}/rating`, {
        rating: score,
      })
      setIsSubmitted(true)
    } catch (e) {
      handleError(e)
    }
  }

  return { handleScoreClick, score, handleSubmit, isSubmitted }
}

export default useReview
