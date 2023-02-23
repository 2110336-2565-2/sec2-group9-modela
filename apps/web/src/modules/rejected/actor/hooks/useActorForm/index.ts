import { zodResolver } from '@hookform/resolvers/zod'
import { ActorInfoDto } from '@modela/dtos'
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

import { editActorInfoSchema, IEditActorInfoSchema } from './schema'

const useActorForm = (defaultValues: ActorInfoDto) => {
  const router = useRouter()
  const { refetch } = useUser()
  const { handleError } = useErrorHandler()

  const { register, handleSubmit, control, setValue, getValues, setError } =
    useForm<IEditActorInfoSchema>({
      criteriaMode: 'all',
      defaultValues: defaultValues,
      resolver: zodResolver(editActorInfoSchema),
    })

  const [file, setFile] = useState<Blob | null>(null)
  const [filename, setFilename] = useState<string>()
  const [loading, setLoading] = useState(false)

  const handleSuccess: SubmitHandler<IEditActorInfoSchema> = useCallback(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async ({ idCardImageUrl, ...data }) => {
      console.log(data)
      setLoading(true)
      try {
        const formData = new FormData()
        Object.entries(data).forEach(([key, val]) => {
          formData.append(key, val)
        })

        if (file) {
          formData.append(
            'file',
            new File([file!], filename!, { type: file?.type }),
          )
        }

        await apiClient.put<unknown, unknown, FormData>(
          '/info/actor',
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
    (file: Blob, filename: string) => {
      if (file.size > 5 * 1024 * 1024) {
        setError('idCardImageUrl', {
          message: 'ขนาดไฟล์เกิน 5 MB',
        })
        return
      }
      const blobUrl = URL.createObjectURL(file)

      setFile(file)
      setFilename(filename)
      setValue('idCardImageUrl', blobUrl, {
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
