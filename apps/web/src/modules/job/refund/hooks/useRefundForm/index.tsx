import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import { IRefundFormSchemaType, refundFormSchema } from './schema'

const useRefundForm = () => {
  const [refundDetails] = useState<any>()
  const { control, setError, setValue } = useForm<IRefundFormSchemaType>({
    criteriaMode: 'all',
    resolver: zodResolver(refundFormSchema),
  })

  const [fileDetails, setFileDetails] = useState<File | null>(null)

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

  return {
    control,
    refundDetails,
    fileDetails,
    handleUploadFile,
  }
}

export default useRefundForm
