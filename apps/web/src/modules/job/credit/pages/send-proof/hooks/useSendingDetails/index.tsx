import { useErrorHandler } from 'common/hooks/useErrorHandler'
import useSwitch from 'common/hooks/useSwitch'
import { apiClient } from 'common/utils/api'
import { uploadFileToS3 } from 'common/utils/file'
import { FormEvent, useCallback, useEffect, useState } from 'react'

import { IUploadedFileDetails } from './types'

const useSendingDetails = (jobId: number) => {
  // This will change to strict type later
  const [job, setJob] = useState<any>({})
  const [uploadedFile, setUploadedFile] = useState<IUploadedFileDetails>({
    file: null,
    fileUrl: '',
  })
  const [error, setError] = useState<string>('')
  const { isOpen: isModalOpen, open: openSuccessModal } = useSwitch(false)

  const { handleError } = useErrorHandler()

  const handleFetchDetails = useCallback(async () => {
    try {
      const res = await apiClient.get(`credits/jobs/${jobId}`)
      setJob(res.data)
    } catch (err) {
      handleError(err)
    }
  }, [jobId, handleError])

  const handleUploadFile = (file: File) => {
    setError('')
    if (file.size >= 5 * 1024 * 1024) {
      setError('ไฟล์ขนาดห้ามเกิน 5 MB')
      return
    }
    URL.revokeObjectURL(uploadedFile.fileUrl)
    setUploadedFile({ file, fileUrl: URL.createObjectURL(file) })
  }

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    if (!uploadedFile.file) {
      setError('กรุณาอัปโหลดหลักฐานการโอนเงิน')
      return
    }

    try {
      const signedUrl = await uploadFileToS3(uploadedFile.file)
      await apiClient.post(`/credits/jobs/${jobId}`, {
        fileUrl: signedUrl,
      })
      openSuccessModal()
    } catch (err) {
      handleError(err)
    }
  }

  useEffect(() => {
    handleFetchDetails()
  }, [handleFetchDetails])

  return {
    job,
    error,
    isModalOpen,
    fileUrl: uploadedFile.fileUrl,
    handleUploadFile,
    handleSubmit,
  }
}

export default useSendingDetails
