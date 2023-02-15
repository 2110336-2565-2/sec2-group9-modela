import { zodResolver } from '@hookform/resolvers/zod'
import { SignupCastingDto } from '@modela/dtos'
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

import { castingSignupSchema, ICastingSignupSchemaType } from './schema'

const useCastingForm = () => {
  const router = useRouter()
  const { refetch } = useUser()

  const { register, handleSubmit, control, setValue, getValues, setError } =
    useForm<ICastingSignupSchemaType>({
      criteriaMode: 'all',
      resolver: zodResolver(castingSignupSchema),
    })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [file, setFile] = useState<Blob | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSuccess: SubmitHandler<ICastingSignupSchemaType> = useCallback(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async ({ confirmPassword, ...data }) => {
      setLoading(true)
      try {
        const postBody = {
          ...data,
          employmentCertUrl: 'https://via.placeholder.com/150',
        }
        await apiClient.post<unknown, unknown, SignupCastingDto>(
          '/auth/signup/casting',
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
      setValue('employmentCertUrl', blobUrl, {
        shouldValidate: true,
      })
    },
    [setValue],
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

export default useCastingForm
