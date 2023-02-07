import { zodResolver } from '@hookform/resolvers/zod'
import { FormEventHandler, useCallback } from 'react'
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
        dueDate: new Date(),
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

  const handleClickSubmit: FormEventHandler<HTMLFormElement> =
    handleSubmit(handleSuccess)

  const handleAppend = () => {
    append({
      startDate: new Date(),
      endDate: new Date(),
      location: '',
      startTime: new Date(),
      endTime: new Date(),
    })
  }

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
