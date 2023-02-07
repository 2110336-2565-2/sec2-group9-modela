import { zodResolver } from '@hookform/resolvers/zod'
import { SignupActorDto } from '@modela/dtos'
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
  const { register, handleSubmit, control, setValue, getValues, setError } =
    useForm<IActorSignupSchemaType>({
      criteriaMode: 'all',
      resolver: zodResolver(actorSignupSchema),
    })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [file, setFile] = useState<Blob | null>(null)

  const handleSuccess: SubmitHandler<IActorSignupSchemaType> = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    async ({ confirmPassword, ...data }) => {
      try {
        await apiClient.post<unknown, unknown, SignupActorDto>(
          '/auth/signup/actor',
          {
            ...data,
            // Dummy image (Will be changed after implement upload)
            idCardImageUrl: 'https://via.placeholder.com/150',
          },
        )
        router.push('/job')
      } catch (err) {
        console.log(err)
      }
    },
    [router],
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

  return { handleClickSubmit, register, handleUploadFile, control, setError }
}

export default useActorForm
