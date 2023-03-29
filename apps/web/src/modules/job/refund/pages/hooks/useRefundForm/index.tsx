import { zodResolver } from '@hookform/resolvers/zod'
import { RequestRefundInfoDto } from '@modela/dtos'
import { AxiosError } from 'axios'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import useSwitch from 'common/hooks/useSwitch'
import { apiClient } from 'common/utils/api'
import { uploadFileToS3 } from 'common/utils/file'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { IRefundFormSchemaType, refundFormSchema } from './schema'

const useRefundForm = (jobId: number, actorId: number) => {
  const [refundDetails, setRefundDetails] = useState<RequestRefundInfoDto>()
  const [file, setFile] = useState<File | null>(null)

  const { control, setError, setValue, handleSubmit } =
    useForm<IRefundFormSchemaType>({
      criteriaMode: 'all',
      resolver: zodResolver(refundFormSchema),
    })
  const { handleError } = useErrorHandler()
  const router = useRouter()
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

        await apiClient.post(`/refunds/jobs/${jobId}/actors/${actorId}`, {
          data: {
            reason: data.reason,
            proof: fileUrl,
          },
        })
        openModal()
      } catch (error) {
        handleError(error)
      }
    },
    [actorId, file, handleError, jobId, openModal],
  )

  const handleFetchRefundDetails = useCallback(async () => {
    try {
      const { data } = await apiClient.get<RequestRefundInfoDto>(
        `/refunds/jobs/${jobId}/actors/${actorId}`,
      )

      setRefundDetails(data)
    } catch (error) {
      const errorRes = error as AxiosError
      if (errorRes.response?.status === 400) {
        router.replace(`/job/${jobId}/actor`)
        return
      }
      handleError(error)
    }
  }, [actorId, jobId, router, handleError])

  useEffect(() => {
    handleFetchRefundDetails()
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
