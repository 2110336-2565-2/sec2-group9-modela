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
  const [currentFile, setCurrentFile] = useState<Blob | undefined>(undefined)

  const [error, setError] = useState<IError>({})

  const handleSelectFile = useCallback((file: Blob, filename: string) => {
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
    setFileName(filename)
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

    await handleSubmit(resumeName, resumeId, currentFile)
    changeToView()
  }, [
    changeToView,
    currentFile,
    handleSubmit,
    resumeId,
    resumeName,
    validateInput,
  ])

  useEffect(() => {
    const prev = fileUrl
    return () => {
      URL.revokeObjectURL(prev)
    }
  }, [fileUrl])

  return {
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
