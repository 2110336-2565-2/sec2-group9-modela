import { zodResolver } from '@hookform/resolvers/zod'
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

import { actorSignupSchema, IActorSignupSchemaType } from './schema'

const useActorForm = () => {
  const router = useRouter()
  const { refetch } = useUser()
  const { handleError } = useErrorHandler()

  const { register, handleSubmit, control, setValue, getValues, setError } =
    useForm<IActorSignupSchemaType>({
      criteriaMode: 'all',
      resolver: zodResolver(actorSignupSchema),
    })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [file, setFile] = useState<File | null>(null)
  const [filename, setFilename] = useState<string>()
  const [loading, setLoading] = useState(false)

  const handleSuccess: SubmitHandler<IActorSignupSchemaType> = useCallback(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async ({ confirmPassword, idCardImageUrl, ...data }) => {
      setLoading(true)
      try {
        const formData = new FormData()
        Object.entries(data).forEach(([key, val]) => {
          if (typeof val === 'undefined') return
          formData.append(key, val)
        })

        formData.append(
          'file',
          new File([file!], filename!, { type: file?.type }),
        )

        await apiClient.post<unknown, unknown, FormData>(
          '/auth/signup/actor',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        await refetch()
        router.push('/job')
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
        setError('idCardImageUrl', {
          message: 'ขนาดไฟล์เกิน 5 MB',
        })
        return
      }
      const FileUrl = URL.createObjectURL(file)

      setFile(file)
      setFilename(file.name)
      setValue('idCardImageUrl', FileUrl, {
        shouldValidate: true,
      })
    },
    [setError, setValue],
  )

  const handleClickSubmit: FormEventHandler<HTMLFormElement> =
    handleSubmit(handleSuccess)

  const currentUrl = useMemo(() => getValues('idCardImageUrl'), [getValues])

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
