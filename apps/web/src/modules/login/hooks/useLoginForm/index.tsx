import { zodResolver } from '@hookform/resolvers/zod'
import { LoginDto } from '@modela/dtos'
import { AxiosError } from 'axios'
import { useSnackbar } from 'common/context/SnackbarContext'
import { useUser } from 'common/context/UserContext'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import { FormEventHandler, useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ILoginSchemaType, LoginSchema } from './schema'

const useLoginForm = () => {
  const router = useRouter()
  const { refetch } = useUser()
  const { displaySnackbar } = useSnackbar()

  const { register, handleSubmit, control, setError } =
    useForm<ILoginSchemaType>({
      criteriaMode: 'all',
      resolver: zodResolver(LoginSchema),
    })

  const [loading, setLoading] = useState(false)

  const handleSuccess: SubmitHandler<ILoginSchemaType> = useCallback(
    async (data) => {
      setLoading(true)
      try {
        await apiClient.post<unknown, unknown, LoginDto>('/auth/login', data)
        await refetch()
        router.push('/job')
      } catch (err) {
        const error = err as AxiosError<{ message: string }>

        if (error.response?.status === 401)
          displaySnackbar('อีเมลหรือรหัสผ่านไม่ถูกต้อง', 'error')

        displaySnackbar('เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ', 'error')
      } finally {
        setLoading(false)
      }
    },
    [displaySnackbar, refetch, router],
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
