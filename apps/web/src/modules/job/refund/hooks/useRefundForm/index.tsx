import { zodResolver } from '@hookform/resolvers/zod'
import useSwitch from 'common/hooks/useSwitch'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import { IRefundFormSchemaType, refundFormSchema } from './schema'

const useRefundForm = () => {
  const [refundDetails] = useState<any>()
  const { control, setError, setValue, handleSubmit } =
    useForm<IRefundFormSchemaType>({
      criteriaMode: 'all',
      resolver: zodResolver(refundFormSchema),
    })

  const { isOpen: isModalOpen, open: openModal } = useSwitch()

  const [, setFileDetails] = useState<File | null>(null)

  const handleUploadFile = useCallback(
    (file: File) => {
      if (file.size > 5 * 1024 * 1024) {
        setError('evidenceUrl', {
          message: 'ขนาดไฟล์เกิน 5 MB',
        })
        return
      }
      const fileUrl = URL.createObjectURL(file)

      setFileDetails(file)
      setValue('evidenceUrl', fileUrl, {
        shouldValidate: true,
      })
    },
    [setValue, setError],
  )

  const handleSuccess = useCallback(
    async (data: IRefundFormSchemaType) => {
      try {
        console.log(data)
        openModal()
      } catch (error) {
        console.log(error)
      }
    },
    [openModal],
  )

  return {
    control,
    refundDetails,
    isModalOpen,
    handleSubmit: handleSubmit(handleSuccess),
    handleUploadFile,
  }
}

export default useRefundForm
