import { zodResolver } from '@hookform/resolvers/zod'
import { FormEventHandler, useCallback } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'

import { actorSignupSchema, IActorSignupSchemaType } from './schema'

const useActorForm = () => {
  const { register, handleSubmit, control, setValue } =
    useForm<IActorSignupSchemaType>({
      criteriaMode: 'all',
      resolver: zodResolver(actorSignupSchema),
    })

  const handleFailed: SubmitErrorHandler<IActorSignupSchemaType> = useCallback(
    (e) => {
      console.log(e)
      console.log('failed')
    },
    [],
  )

  const handleSuccess: SubmitHandler<IActorSignupSchemaType> =
    useCallback(() => {
      console.log('success')
    }, [])

  const handleUploadFile = useCallback(
    (url: string) => {
      setValue('idCardImageUrl', url)
    },
    [setValue],
  )

  const handleClickSubmit: FormEventHandler<HTMLFormElement> = handleSubmit(
    handleSuccess,
    handleFailed,
  )

  return { handleClickSubmit, register, handleUploadFile, control }
}

export default useActorForm
