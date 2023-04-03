import { zodResolver } from '@hookform/resolvers/zod'
import { CastingInfoDto } from '@modela/dtos'
import { useUser } from 'common/context/UserContext'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import {
  FormEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { editCastingInfoSchema, IEditCastingInfoSchema } from './schema'

const useActorForm = (defaultValues: CastingInfoDto) => {
  const router = useRouter()
  const { refetch } = useUser()
  const { handleError } = useErrorHandler()

  const { register, handleSubmit, control, setValue, getValues, setError } =
    useForm<IEditCastingInfoSchema>({
      criteriaMode: 'all',
      defaultValues: defaultValues,
      resolver: zodResolver(editCastingInfoSchema),
    })

  const [file, setFile] = useState<File | null>(null)
  const [filename, setFilename] = useState<string>()
  const [loading, setLoading] = useState(false)

  const handleSuccess: SubmitHandler<IEditCastingInfoSchema> = useCallback(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async ({ employmentCertUrl, ...data }) => {
      setLoading(true)
      try {
        const formData = new FormData()
        Object.entries(data).forEach(([key, val]) => {
          if (typeof val === 'undefined') return
          formData.append(key, val)
        })

        if (file) {
          formData.append(
            'file',
            new File([file!], filename!, { type: file?.type }),
          )
        }

        await apiClient.put<unknown, unknown, FormData>(
          '/info/casting',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        await refetch()
        router.push('/waiting')
      } catch (err) {
        handleError(err, { 409: 'อีเมลนี้ถูกใช้ไปแล้ว' })
      } finally {
        setLoading(false)
      }
    },
    [file, filename, handleError, refetch, router],
  )

  const handleUploadFile = useCallback(
    (file: File) => {
      if (file.size > 5 * 1024 * 1024) {
        setError('employmentCertUrl', {
          message: 'ขนาดไฟล์เกิน 5 MB',
        })
        return
      }
      const fileUrl = URL.createObjectURL(file)

      setFile(file)
      setFilename(file.name)
      setValue('employmentCertUrl', fileUrl, {
        shouldValidate: true,
      })
    },
    [setError, setValue],
  )

  const handleClickSubmit: FormEventHandler<HTMLFormElement> =
    handleSubmit(handleSuccess)

  const currentUrl = useMemo(() => getValues('employmentCertUrl'), [getValues])

  useEffect(() => {
    const prevUrl = currentUrl
    return () => {
      URL.revokeObjectURL(prevUrl)
    }
  }, [currentUrl])

  return {
    loading,
    handleClickSubmit,
    register,
    handleUploadFile,
    control,
    setError,
  }
}

export default useActorForm
