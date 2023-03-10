import { zodResolver } from '@hookform/resolvers/zod'
import { LoginDto } from '@modela/dtos'
import { useUser } from 'common/context/UserContext'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import { FormEventHandler, useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ILoginSchemaType, LoginSchema } from './schema'

const useLoginForm = () => {
  const router = useRouter()
  const { refetch } = useUser()

  const { register, handleSubmit, control, setError } =
    useForm<ILoginSchemaType>({
      criteriaMode: 'all',
      resolver: zodResolver(LoginSchema),
    })

  const [loading, setLoading] = useState(false)
  const { handleError } = useErrorHandler()

  const handleSuccess: SubmitHandler<ILoginSchemaType> = useCallback(
    async (data) => {
      setLoading(true)
      try {
        await apiClient.post<unknown, unknown, LoginDto>('/auth/login', data)
        await refetch()
        router.push('/job')
      } catch (err) {
        handleError(err, { 401: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' })
      } finally {
        setLoading(false)
      }
    },
    [handleError, refetch, router],
  )

  const handleClickSubmit: FormEventHandler<HTMLFormElement> =
    handleSubmit(handleSuccess)

  return {
    loading,
    handleClickSubmit,
    register,
    control,
    setError,
  }
}

export default useLoginForm
