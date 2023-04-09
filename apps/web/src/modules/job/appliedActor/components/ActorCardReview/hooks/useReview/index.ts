import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { MouseEvent, SyntheticEvent, useCallback, useState } from 'react'

const useReview = () => {
  const [score, setScore] = useState<number | null>(0)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const { handleError } = useErrorHandler()

  const handleScoreClick = useCallback(
    (event: SyntheticEvent, value: number | null) => {
      event.preventDefault()
      event.stopPropagation()
      setScore(value)
    },
    [],
  )

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      // call api

      setIsSubmitted(true)
    } catch (e) {
      handleError(e)
    }
  }

  return { handleScoreClick, score, handleSubmit, isSubmitted }
}

export default useReview
