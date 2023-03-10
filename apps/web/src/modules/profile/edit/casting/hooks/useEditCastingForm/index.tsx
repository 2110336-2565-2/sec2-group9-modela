import { zodResolver } from '@hookform/resolvers/zod'
import { EditCastingProfileDto } from '@modela/dtos'
import { useUser } from 'common/context/UserContext'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import { uploadFileToS3 } from 'common/utils/file'
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

  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [isDataLoading, setDataLoading] = useState(true)
  const { handleError } = useErrorHandler()
  const { user } = useUser()

  const handleSuccess: SubmitHandler<IEditCastingProfileSchemaType> =
    useCallback(
      async (data) => {
        setLoading(true)
        try {
          const profileImageUrl = profileImage
            ? await uploadFileToS3(profileImage!)
            : data.profileImageUrl

          await apiClient.put<unknown, unknown, EditCastingProfileDto>(
            '/profile/casting',
            { ...data, profileImageUrl },
          )
          router.push('/profile')
        } catch (err) {
          handleError(err)
        } finally {
          setLoading(false)
        }
      },
      [handleError, profileImage, router],
    )

  const handleClickSubmit: FormEventHandler<HTMLFormElement> =
    handleSubmit(handleSuccess)

  const handleUploadImage = useCallback(
    (file: File) => {
      URL.revokeObjectURL(getValues('profileImageUrl') || '')
      const fileUrl = URL.createObjectURL(file)

      setProfileImage(file)
      setValue('profileImageUrl', fileUrl, {
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
    user,
    imageUrl: getValues('profileImageUrl') || user?.profileImageUrl,
  }
}

export default useEditCastingForm
