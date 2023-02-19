import { zodResolver } from '@hookform/resolvers/zod'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import {
  FormEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { editActorInfoSchema, IEditActorInfoSchema } from './schema'

const useActorForm = () => {
  const { handleError } = useErrorHandler()

  const { register, handleSubmit, control, setValue, getValues, setError } =
    useForm<IEditActorInfoSchema>({
      criteriaMode: 'all',
      resolver: zodResolver(editActorInfoSchema),
    })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [file, setFile] = useState<Blob | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSuccess: SubmitHandler<IEditActorInfoSchema> = useCallback(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (data) => {
      setLoading(true)
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const postBody = {
          ...data,
          idCardImageUrl: 'https://via.placeholder.com/150',
        }

        console.log(postBody)
        // TODO Connect API
      } catch (err) {
        handleError(err, { 409: 'อีเมลนี้ถูกใช้ไปแล้ว' })
      } finally {
        setLoading(false)
      }
    },
    [handleError],
  )

  const handleUploadFile = useCallback(
    (file: Blob) => {
      const blobUrl = URL.createObjectURL(file)

      setFile(file)
      setValue('idCardImageUrl', blobUrl, {
        shouldValidate: true,
      })
    },
    [setValue],
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
