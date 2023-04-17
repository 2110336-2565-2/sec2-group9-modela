import { GetResumesDto, PostResumeDto, ResumeIdDto } from '@modela/dtos'
import { AxiosResponse } from 'axios'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import useSwitch from 'common/hooks/useSwitch'
import { apiClient } from 'common/utils/api'
import { uploadFileToS3 } from 'common/utils/file'
import { useCallback, useEffect, useState } from 'react'

import { IResumeWithFirstFlag } from './types'

export const useResumeInfo = () => {
  const [resume, setResume] = useState<IResumeWithFirstFlag[]>([])
  const [resumeId, setResumeId] = useState(0)
  const [resumeName, setResumeName] = useState('')
  const { isOpen: isLoading, close: finishLoading } = useSwitch(true)
  const { isOpen: isModalOpen, close, open } = useSwitch()
  const { handleError } = useErrorHandler()

  const handleAddNewResume = useCallback(() => {
    const newResume = {
      name: '',
      resumeId: Math.random(),
      resumeUrl: '',
      isFirst: true,
    }

    setResume((prev) => [...prev, newResume])
  }, [])

  const handleDeleteResume = useCallback(async () => {
    try {
      await apiClient.delete(`/resumes/${resumeId}`)
      setResume((prev) => prev.filter((val) => val.resumeId !== resumeId))
      close()
    } catch (err) {
      handleError(err)
    }
  }, [close, resumeId, handleError])

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
    async (name: string, resumeId: number, file?: File) => {
      const currentIdx = resume.findIndex((val) => val.resumeId === resumeId)

      let resumeUrl = ''
      if (file) {
        try {
          resumeUrl = await uploadFileToS3(file)
        } catch (err) {
          handleError(err, {
            400: 'เกิดข้อผิดพลาดในการอัพโหลดรูปภาพ',
            403: 'เกิดข้อผิดพลาดในการอัพโหลดรูปภาพ',
            500: 'เกิดข้อผิดพลาดในการอัพโหลดรูปภาพ',
          })
          return
        }
      }

      if (resume[currentIdx]?.isFirst) {
        try {
          const { resumeId } = (
            await apiClient.post<
              ResumeIdDto,
              AxiosResponse<ResumeIdDto>,
              PostResumeDto
            >('/resumes', {
              name,
              resumeUrl,
            })
          ).data

          const newResume = {
            name,
            resumeId,
            resumeUrl,
          }

          setResume((prev) => {
            prev.splice(currentIdx, 1, newResume)
            return [...prev]
          })
        } catch (err) {
          handleError(err)
          throw err
        }
        return
      } else {
        if (!resumeUrl) resumeUrl = resume[currentIdx].resumeUrl
        try {
          await apiClient.put<
            ResumeIdDto,
            AxiosResponse<ResumeIdDto>,
            PostResumeDto
          >(`/resumes/${resumeId}`, {
            name,
            resumeUrl,
          })
          const newResume = {
            name,
            resumeId,
            resumeUrl,
          }

          setResume((prev) => {
            prev.splice(currentIdx, 1, newResume)
            return [...prev]
          })
        } catch (err) {
          handleError(err)
        }
      }
    },
    [handleError, resume],
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

  useEffect(() => {
    const getInitialResume = async () => {
      try {
        const data = (await apiClient.get<GetResumesDto>('/resumes')).data
        setResume(data.resumes)
      } catch (err) {
        handleError(err)
      }
      finishLoading()
    }

    getInitialResume()
  }, [finishLoading, handleError])

  return {
    resume,
    resumeName,
    isModalOpen,
    isLoading,
    handleAddNewResume,
    handleCancelUpdate,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteResume,
    handleUpdateResume,
  }
}
