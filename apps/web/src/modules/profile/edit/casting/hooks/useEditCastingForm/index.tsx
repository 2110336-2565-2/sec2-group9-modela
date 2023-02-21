import { zodResolver } from '@hookform/resolvers/zod'
import { EditCastingProfileDto } from '@modela/dtos'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import { FormEventHandler, useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
  EditCastingProfileDefault,
  EditCastingProfileSchema,
  IEditCastingProfileSchemaType,
} from './schema'

const useEditCastingForm = () => {
  const router = useRouter()

  const { handleSubmit, setValue, getValues, control, reset } =
    useForm<IEditCastingProfileSchemaType>({
      criteriaMode: 'all',
      resolver: zodResolver(EditCastingProfileSchema),
      defaultValues: EditCastingProfileDefault,
    })

  const [, setProfileImage] = useState<Blob | null>(null)
  const [loading, setLoading] = useState(false)
  const [isDataLoading, setDataLoading] = useState(true)
  const { handleError } = useErrorHandler()

  const handleSuccess: SubmitHandler<IEditCastingProfileSchemaType> =
    useCallback(
      async (data) => {
        setLoading(true)
        try {
          await apiClient.put<unknown, unknown, EditCastingProfileDto>(
            '/profile/casting',
            { ...data, profileImageUrl: 'https://via.placeholder.com/150 ' },
          )
          router.push('/profile')
        } catch (err) {
          handleError(err)
        } finally {
          setLoading(false)
        }
      },
      [handleError, router],
    )

  const handleClickSubmit: FormEventHandler<HTMLFormElement> =
    handleSubmit(handleSuccess)

  const handleUploadImage = useCallback(
    (file: Blob) => {
      URL.revokeObjectURL(getValues('profileImageUrl') || '')
      const blobUrl = URL.createObjectURL(file)

      setProfileImage(file)
      setValue('profileImageUrl', blobUrl, {
        shouldValidate: true,
      })
    },
    [getValues, setValue],
  )

  const getInitialValue = useCallback(async () => {
    try {
      const res = (
        await apiClient.get<{ data: EditCastingProfileDto }>('/profile')
      ).data
      reset(res.data)
    } catch (err) {
      handleError(err)
    } finally {
      setDataLoading(false)
    }
  }, [reset, handleError])

  useEffect(() => {
    getInitialValue()
  }, [getInitialValue])

  return {
    loading,
    handleClickSubmit,
    handleUploadImage,
    getValues,
    control,
    isDataLoading,
    imageUrl: getValues('profileImageUrl'),
  }
}

export default useEditCastingForm
