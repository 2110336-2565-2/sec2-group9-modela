import { zodResolver } from '@hookform/resolvers/zod'
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
  const { register, handleSubmit, control, setValue, getValues, setError } =
    useForm<IActorSignupSchemaType>({
      criteriaMode: 'all',
      resolver: zodResolver(actorSignupSchema),
    })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [file, setFile] = useState<Blob | null>(null)

  const handleSuccess: SubmitHandler<IActorSignupSchemaType> =
    useCallback(() => {
      console.log('success')
    }, [])

  const handleUploadFile = useCallback(
    (file: Blob) => {
      const blobUrl = URL.createObjectURL(file)

      setFile(file)
      setValue('idCardImageUrl', blobUrl)
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
