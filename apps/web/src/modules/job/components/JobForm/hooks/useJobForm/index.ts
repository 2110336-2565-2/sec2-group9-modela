import { zodResolver } from '@hookform/resolvers/zod'
import { CreateJobDto, EditJobDto } from '@modela/dtos'
import { useSnackbar } from 'common/context/SnackbarContext'
import { apiClient } from 'common/utils/api'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { FormEventHandler, useCallback, useEffect, useMemo } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import { fieldToPayload } from '../../utils/jobAdapter'
import { IPostJobSchemaType, postJobSchema } from './schema'

const useJobForm = (defaultValues: IPostJobSchemaType, edit?: boolean) => {
  const { register, handleSubmit, control, setError, reset } =
    useForm<IPostJobSchemaType>({
      criteriaMode: 'all',
      resolver: zodResolver(postJobSchema),
      defaultValues: defaultValues,
    })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const router = useRouter()
  const { displaySnackbar } = useSnackbar()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'shooting',
  })

  const handleSuccess: SubmitHandler<IPostJobSchemaType> = useCallback(
    async (data) => {
      const payload = fieldToPayload(data)
      const { jobId } = router.query as { jobId: string }
      if (edit) {
        await apiClient.put<unknown, unknown, EditJobDto>(
          `/job/${jobId}`,
          payload,
        )
        displaySnackbar('แก้ไขงานสำเร็จ', 'success')
        router.push(`/job/${jobId}`)
      }
      //post job
      else {
        await apiClient.post<unknown, unknown, CreateJobDto>('/job/', payload)
        displaySnackbar('ลงประกาศงานสำเร็จ', 'success')
        router.push('/job')
      }
    },
    [displaySnackbar, edit, router],
  )

  const handleClickSubmit: FormEventHandler<HTMLFormElement> = useMemo(
    () => handleSubmit(handleSuccess),
    [handleSubmit, handleSuccess],
  )

  const handleAppend = useCallback(() => {
    append({
      startDate: dayjs().add(1, 'day'),
      endDate: dayjs().add(1, 'day'),
      shootingLocation: '',
      startTime: dayjs().startOf('day'),
      endTime: dayjs().startOf('day'),
    })
  }, [append])

  return {
    handleClickSubmit,
    register,
    control,
    setError,
    fields,
    handleAppend,
    remove,
  }
}

export default useJobForm
