import { GetTransactionDetailDto } from '@modela/dtos'
import { AxiosError } from 'axios'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import useSwitch from 'common/hooks/useSwitch'
import { apiClient } from 'common/utils/api'
import { uploadFileToS3 } from 'common/utils/file'
import { useRouter } from 'next/router'
import { FormEvent, useCallback, useEffect, useState } from 'react'

import { IUploadedFileDetails } from './types'

const useSendingDetails = (jobId: number) => {
  const [job, setJob] = useState<GetTransactionDetailDto | null>(null)
  const [uploadedFile, setUploadedFile] = useState<IUploadedFileDetails>({
    file: null,
    fileUrl: '',
  })
  const [error, setError] = useState<string>('')
  const { isOpen: isModalOpen, open: openSuccessModal } = useSwitch(false)

  const { handleError } = useErrorHandler()
  const router = useRouter()

  const handleFetchDetails = useCallback(async () => {
    try {
      const res = await apiClient.get<GetTransactionDetailDto>(
        `credits/jobs/${jobId}`,
      )
      setJob(res.data)
    } catch (err) {
      const errorRes = err as AxiosError
      handleError(err, { 400: 'ไม่สามารถส่งหลักฐานได้ใน ณ ขณะนี้' })
      if (errorRes.response?.status === 400) {
        router.replace(`/job/${jobId}/actor`)
      }
    }
  }, [jobId, handleError, router])

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
        proofUrl: signedUrl,
      })
      openSuccessModal()
    } catch (err) {
      handleError(err, {
        400: 'ท่านได้ส่งหลักฐานการชำระเงินแล้วหรือการคัดเลือกยังไม่สิ้นสุด',
      })
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
