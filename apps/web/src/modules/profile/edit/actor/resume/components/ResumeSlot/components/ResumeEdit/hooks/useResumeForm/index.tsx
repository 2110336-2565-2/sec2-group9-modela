import useSwitch from 'common/hooks/useSwitch'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { IResumeEditProps } from '../../types'
import { IError } from './types'

export const useResumeForm = (
  name: string,
  resumeUrl: string,
  resumeId: number,
  handleSubmit: IResumeEditProps['handleSubmit'],
  changeToView: IResumeEditProps['changeToView'],
) => {
  const [resumeName, setResumeName] = useState(name)
  const [fileUrl, setFileUrl] = useState(resumeUrl)
  const [fileName, setFileName] = useState<string>('')
  const [currentFile, setCurrentFile] = useState<File | undefined>(undefined)
  const {
    isOpen: isLoading,
    open: startLoading,
    close: stopLoading,
  } = useSwitch(false)

  const [error, setError] = useState<IError>({})

  const handleSelectFile = useCallback((file: File) => {
    if (file.size >= 5 * 1024 * 1024) {
      setError((prev) => ({
        ...prev,
        file: 'ไฟล์ขนาดห้ามเกิน 5 MB',
      }))
      return
    }

    const tempUrl = URL.createObjectURL(file)
    setCurrentFile(file)
    setFileUrl(tempUrl)
    setFileName(file.name)
    setError((prev) => ({
      resumeName: prev?.resumeName,
    }))
  }, [])

  const handleChangeName = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    setResumeName(ev.target.value)
    setError((prev) => ({
      file: prev?.file,
    }))
  }, [])

  const validateInput = useCallback(() => {
    const error: IError = {} as IError

    if (!currentFile && !resumeUrl) error.file = 'กรุณาอัพโหลดไฟล์'
    if (!resumeName) error.resumeName = 'กรุณากรอกชื่อ'
    if ((currentFile?.size || 0) >= 5 * 1024 * 1024)
      error.file = 'ไฟล์ขนาดห้ามเกิน 5 MB'

    return error
  }, [currentFile, resumeName, resumeUrl])

  const handleSave = useCallback(async () => {
    const error = validateInput()

    if (error.file || error.resumeName) {
      setError(error)
      return
    }

    startLoading()
    try {
      await handleSubmit(resumeName, resumeId, currentFile)
      changeToView()
    } finally {
      stopLoading()
    }
  }, [
    changeToView,
    currentFile,
    handleSubmit,
    resumeId,
    resumeName,
    startLoading,
    stopLoading,
    validateInput,
  ])

  useEffect(() => {
    const prev = fileUrl
    return () => {
      URL.revokeObjectURL(prev)
    }
  }, [fileUrl])

  return {
    isLoading,
    resumeName,
    fileUrl,
    fileName,
    error,
    handleSave,
    handleChangeName,
    handleSelectFile,
  }
}

export default useResumeForm
