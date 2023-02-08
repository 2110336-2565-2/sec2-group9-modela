import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { FormEventHandler, useCallback, useMemo } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import { IPostJobSchemaType, postJobSchema } from './schema'

const useJobForm = () => {
  const { register, handleSubmit, control, setError } =
    useForm<IPostJobSchemaType>({
      criteriaMode: 'all',
      resolver: zodResolver(postJobSchema),
      defaultValues: {
        jobName: '',
        jobDescription: '',
        dueDate: dayjs().add(1, 'day'),
        wage: '',
        shooting: [],
        actorCount: '',
        gender: 'ANY',
        minAge: '',
        maxAge: '',
        role: '',
      },
    })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'shooting',
  })

  const handleSuccess: SubmitHandler<IPostJobSchemaType> = useCallback(() => {
    console.log('success')
  }, [])

  const handleClickSubmit: FormEventHandler<HTMLFormElement> = useMemo(() => {
    return handleSubmit(handleSuccess)
  }, [])

  const handleAppend = useCallback(() => {
    append({
      startDate: dayjs(),
      endDate: dayjs(),
      location: '',
      startTime: dayjs().startOf('day'),
      endTime: dayjs().startOf('day'),
    })
  }, [])

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
