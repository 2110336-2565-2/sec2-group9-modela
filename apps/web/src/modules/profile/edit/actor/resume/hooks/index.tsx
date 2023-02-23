import useSwitch from 'common/hooks/useSwitch'
import { useCallback, useState } from 'react'

import { IResumeWithFirstFlag } from './types'

export const useResumeInfo = () => {
  const [resume, setResume] = useState<IResumeWithFirstFlag[]>([])
  const [resumeId, setResumeId] = useState(0)
  const [resumeName, setResumeName] = useState('')
  const { isOpen: isModalOpen, close, open } = useSwitch()

  const handleAddNewResume = useCallback(() => {
    const newResume = {
      name: '',
      resumeId: Math.random(),
      resumeUrl: '',
      isFirst: true,
    }

    setResume((prev) => [...prev, newResume])
  }, [])

  const handleDeleteResume = useCallback(() => {
    // TODO: call delete API

    setResume((prev) => prev.filter((val) => val.resumeId !== resumeId))
    close()
  }, [resumeId, close])

  const handleOpenDeleteModal = useCallback(
    (resumeId: number) => {
      const currentIdx = resume.findIndex((val) => val.resumeId === resumeId)

      setResumeId(resumeId)
      setResumeName(resume[currentIdx].name)
      open()
    },
    [open, resume],
  )

  const handleCloseDeleteModal = useCallback(() => {
    close()
  }, [close])

  const handleUpdateResume = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (file: File, name: string, resumeId: number) => {
      const currentIdx = resume.findIndex((val) => val.resumeId === resumeId)

      if (resume[currentIdx].isFirst) {
        // TODO: Call Create Resume API
        const newId = Math.random()
        const newResume = {
          name,
          resumeId: newId,
          resumeUrl: 'https://www.google.com',
        }

        setResume((prev) => {
          prev.splice(currentIdx, 1, newResume)
          return [...prev]
        })

        return
      }

      // TODO: Call Put Resume API
    },
    [resume],
  )

  const handleCancelUpdate = useCallback(
    (resumeId: number) => {
      const currentIdx = resume.findIndex((val) => val.resumeId === resumeId)
      if (resume[currentIdx]?.isFirst)
        setResume((prev) => {
          prev.splice(currentIdx, 1)
          return [...prev]
        })
    },
    [resume],
  )

  return {
    resume,
    resumeName,
    isModalOpen,
    handleAddNewResume,
    handleCancelUpdate,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteResume,
    handleUpdateResume,
  }
}
