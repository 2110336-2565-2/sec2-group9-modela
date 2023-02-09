import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { FormEventHandler, useCallback, useMemo } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import useDefaultValues from '../useDefaultValues'
import { IPostJobSchemaType, postJobSchema } from './schema'

const useJobForm = (edit?: boolean) => {
  const defaultValues = useDefaultValues(edit)

  const { register, handleSubmit, control, setError } =
    useForm<IPostJobSchemaType>({
      criteriaMode: 'all',
      resolver: zodResolver(postJobSchema),
      defaultValues,
    })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'shooting',
  })

  const handleSuccess: SubmitHandler<IPostJobSchemaType> = useCallback(() => {
    console.log('success')
  }, [])

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
