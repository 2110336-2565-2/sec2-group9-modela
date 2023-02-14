import { zodResolver } from '@hookform/resolvers/zod'
import { SignupActorDto } from '@modela/dtos'
import { useUser } from 'common/context/UserContext'
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

  const { register, handleSubmit, control, setValue, getValues, setError } =
    useForm<IActorSignupSchemaType>({
      criteriaMode: 'all',
      resolver: zodResolver(actorSignupSchema),
    })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [file, setFile] = useState<Blob | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSuccess: SubmitHandler<IActorSignupSchemaType> = useCallback(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async ({ confirmPassword, ...data }) => {
      setLoading(true)
      try {
        const postBody = {
          ...data,
          idCardImageUrl: 'https://via.placeholder.com/150',
        }
        await apiClient.post<unknown, unknown, SignupActorDto>(
          '/auth/signup/actor',
          postBody,
        )
        await refetch()
        router.push('/job')
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    },
    [refetch, router],
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
