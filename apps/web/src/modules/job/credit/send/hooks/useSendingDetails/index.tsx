import { AxiosError } from 'axios'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import { uploadFileToS3 } from 'common/utils/file'
import { useRouter } from 'next/router'
import { FormEvent, useCallback, useEffect, useState } from 'react'

const useSendingDetails = (jobId: string) => {
  const router = useRouter()

  // This will change to strict type later
  const [job, setJob] = useState<any>({})
  const [uploadedFile, setUploadedFile] = useState<File>()
  const [fileUrl, setFileUrl] = useState('')
  const [error, setError] = useState<string>('')

  const { handleError } = useErrorHandler()

  const handleFetchDetails = useCallback(
    async (isFetch: boolean) => {
      setJob({
        title: 'hello world',
        jobId: 1,
        amount: 50000,
        bankName: 'Kasikorn Bank',
        bankAccount: '1234567890',
      })

      if (!isFetch) return

      try {
        const res = await apiClient.get(`credits/jobs/${jobId}`)
        setJob(res.data)
      } catch (err) {
        const errorRes = err as AxiosError
        if (errorRes.status !== 200) {
          router.replace(`/jobs/${jobId}`)
          return
        }
      }
    },
    [jobId, router],
  )

  const handleUploadFile = (file: File) => {
    setError('')
    if (file.size >= 5 * 1024 * 1024) {
      setError('ไฟล์ขนาดห้ามเกิน 5 MB')
      return
    }
    URL.revokeObjectURL(fileUrl)
    setFileUrl(URL.createObjectURL(file))
    setUploadedFile(file)
  }

  const handleSubmit = (isFetch: boolean) => async (ev: FormEvent) => {
    ev.preventDefault()
    if (!uploadedFile) {
      setError('กรุณาอัปโหลดหลักฐานการโอนเงิน')
      return
    }

    if (!isFetch) return

    try {
      const signedUrl = await uploadFileToS3(uploadedFile)
      await apiClient.post(`/credits/jobs/${jobId}`, {
        fileUrl: signedUrl,
      })
    } catch (err) {
      handleError(err)
    }
  }

  useEffect(() => {
    handleFetchDetails(false)
  }, [handleFetchDetails])

  return {
    job,
    error,
    fileUrl,
    handleUploadFile,
    handleSubmit,
  }
}

export default useSendingDetails
