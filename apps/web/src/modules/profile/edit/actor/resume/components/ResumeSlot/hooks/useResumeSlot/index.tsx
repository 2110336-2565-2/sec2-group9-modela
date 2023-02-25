import { useCallback, useState } from 'react'

const useResumeSlot = (
  isFirst: boolean,
  resumeId: number,
  handleCancel: (resumeId: number) => void,
) => {
  const [isEdit, setEdit] = useState(!!isFirst)

  const changeToEdit = useCallback(() => {
    setEdit(true)
  }, [])

  const changeToView = useCallback(() => {
    setEdit(false)
  }, [])

  const handleCancelWithChanging = useCallback(() => {
    handleCancel(resumeId)
    setEdit(false)
  }, [handleCancel, resumeId])

  return {
    isEdit,
    changeToEdit,
    changeToView,
    handleCancelWithChanging,
  }
}

export default useResumeSlot
