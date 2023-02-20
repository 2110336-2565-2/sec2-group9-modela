import { zodResolver } from '@hookform/resolvers/zod'
import { EditCastingProfileDto } from '@modela/dtos'
import { useUser } from 'common/context/UserContext'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import { FormEventHandler, useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
  EditCastingProfileSchema,
  IEditCastingProfileSchemaType,
} from './schema'

const useEditCastingForm = () => {
  const router = useRouter()
  const { refetch } = useUser()

  const { handleSubmit, setValue, getValues, control } =
    useForm<IEditCastingProfileSchemaType>({
      criteriaMode: 'all',
      resolver: zodResolver(EditCastingProfileSchema),
    })

  const [, setProfileImage] = useState<Blob | null>(null)
  const [loading, setLoading] = useState(false)
  const { handleError } = useErrorHandler()

  const handleSuccess: SubmitHandler<IEditCastingProfileSchemaType> =
    useCallback(
      async (data) => {
        setLoading(true)
        try {
          await apiClient.put<unknown, unknown, EditCastingProfileDto>(
            '/profile/casting',
            { ...data, profileImageUrl: '' },
          )
          await refetch()
          router.push('/profile')
        } catch (err) {
          handleError(err)
        } finally {
          setLoading(false)
        }
      },
      [handleError, refetch, router],
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

  return {
    loading,
    handleClickSubmit,
    handleUploadImage,
    getValues,
    control,
    imageUrl: getValues('profileImageUrl'),
  }
}

export default useEditCastingForm
