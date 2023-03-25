import { zodResolver } from '@hookform/resolvers/zod'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import useSwitch from 'common/hooks/useSwitch'
import { apiClient } from 'common/utils/api'
import { uploadFileToS3 } from 'common/utils/file'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { IRefundFormSchemaType, refundFormSchema } from './schema'

const useRefundForm = (jobId: string, actorId: string) => {
  const [refundDetails, setRefundDetails] = useState<any>()
  const [file, setFile] = useState<File | null>(null)

  const { control, setError, setValue, handleSubmit } =
    useForm<IRefundFormSchemaType>({
      criteriaMode: 'all',
      resolver: zodResolver(refundFormSchema),
    })
  const { handleError } = useErrorHandler()
  const { isOpen: isModalOpen, open: openModal } = useSwitch()

  const handleUploadFile = useCallback(
    (file: File) => {
      if (file.size > 5 * 1024 * 1024) {
        setError('evidenceUrl', {
          message: 'ขนาดไฟล์เกิน 5 MB',
        })
        return
      }
      const fileUrl = URL.createObjectURL(file)

      setFile(file)
      setValue('evidenceUrl', fileUrl, {
        shouldValidate: true,
      })
    },
    [setValue, setError],
  )

  const handleSuccess = useCallback(
    async (data: IRefundFormSchemaType) => {
      try {
        const fileUrl = await uploadFileToS3(file!)

        await apiClient.put(`/refunds/jobs/${jobId}/actors/${actorId}`, {
          data: {
            reason: data.reason,
            proof: fileUrl,
          },
        })
        openModal()
      } catch (error) {
        console.log(error)
      }
    },
    [actorId, file, jobId, openModal],
  )

  const handleFetchRefundDetails = useCallback(
    async (isDev: boolean) => {
      if (isDev) {
        setRefundDetails({
          title: 'งานทดสอบ',
          user: {
            firstname: 'ชื่อ',
            middlename: 'ชื่อกลาง',
            lastname: 'นามสกุล',
          },
        })
        return
      }
      try {
        const { data } = await apiClient.get(
          `/refunds/jobs/${jobId}/actors/${actorId}`,
        )

        setRefundDetails(data)
      } catch (error) {
        handleError(error)
      }
    },
    [actorId, handleError, jobId],
  )

  useEffect(() => {
    handleFetchRefundDetails(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    control,
    refundDetails,
    isModalOpen,
    handleSubmit: handleSubmit(handleSuccess),
    handleUploadFile,
  }
}

export default useRefundForm
