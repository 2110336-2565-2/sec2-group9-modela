import { zodResolver } from '@hookform/resolvers/zod'
import { FormEventHandler, useCallback } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import { IPostJobSchemaType, postJobSchema } from './schema'

const useJobForm = () => {
  const { register, handleSubmit, control, setError } =
    useForm<IPostJobSchemaType>({
      criteriaMode: 'all',
      resolver: zodResolver(postJobSchema),
    })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'Shooting',
  })

  const handleSuccess: SubmitHandler<IPostJobSchemaType> = useCallback(() => {
    console.log('success')
  }, [])

  const handleClickSubmit: FormEventHandler<HTMLFormElement> =
    handleSubmit(handleSuccess)

  return {
    handleClickSubmit,
    register,
    control,
    setError,
    fields,
    append,
    remove,
  }
}

export default useJobForm
