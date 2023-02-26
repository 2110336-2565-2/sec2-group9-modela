import { zodResolver } from '@hookform/resolvers/zod'
import { EditActorProfileDto, EditCastingProfileDto } from '@modela/dtos'
import { AccountCircleOutlined, ArticleOutlined } from '@mui/icons-material'
import { useSnackbar } from 'common/context/SnackbarContext'
import { useUser } from 'common/context/UserContext'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import { uploadFileToS3 } from 'common/utils/file'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { FormEventHandler, useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
  EditActorProfileDefault,
  EditActorProfileSchema,
  IEditActorProfileSchemaType,
} from './schema'

const useEditCastingForm = () => {
  const router = useRouter()
  const { displaySnackbar } = useSnackbar()

  const { handleSubmit, setValue, getValues, control, reset } =
    useForm<IEditActorProfileSchemaType>({
      criteriaMode: 'all',
      resolver: zodResolver(EditActorProfileSchema),
      defaultValues: EditActorProfileDefault,
    })

  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [isDataLoading, setDataLoading] = useState(true)
  const { handleError } = useErrorHandler()
  const { user } = useUser()

  const handleSuccess: SubmitHandler<IEditActorProfileSchemaType> = useCallback(
    async (data) => {
      setLoading(true)
      try {
        const profileImageUrl = profileImage
          ? await uploadFileToS3(profileImage!)
          : data.profileImageUrl

        await apiClient.put<EditCastingProfileDto>('/profile/actor', {
          ...data,
          profileImageUrl,
        })
        displaySnackbar('แก้ไขโปรไฟล์สำเร็จ', 'success')
        router.push('/profile')
      } catch (err) {
        handleError(err)
      } finally {
        setLoading(false)
      }
    },
    [profileImage, displaySnackbar, router, handleError],
  )

  const handleClickSubmit: FormEventHandler<HTMLFormElement> =
    handleSubmit(handleSuccess)

  const handleUploadImage = useCallback(
    (file: File) => {
      URL.revokeObjectURL(getValues('profileImageUrl') || '')
      const FileUrl = URL.createObjectURL(file)

      setProfileImage(file)
      setValue('profileImageUrl', FileUrl, {
        shouldValidate: true,
      })
    },
    [getValues, setValue],
  )

  const getInitialValue = useCallback(async () => {
    try {
      const res = (
        await apiClient.get<{ data: EditActorProfileDto }>('/profile')
      ).data
      reset({ ...res.data, birthDate: dayjs(res.data.birthDate) })
    } catch (err) {
      handleError(err)
    } finally {
      setDataLoading(false)
    }
  }, [reset, handleError])

  useEffect(() => {
    getInitialValue()
  }, [getInitialValue])

  const MENU_ITEM = [
    { icon: <AccountCircleOutlined />, label: 'โปรไฟล์', href: '/about' },
    { icon: <ArticleOutlined />, label: 'เรซูเม่', href: '/blog' },
  ]

  return {
    loading,
    handleClickSubmit,
    handleUploadImage,
    getValues,
    control,
    isDataLoading,
    user,
    imageUrl: getValues('profileImageUrl') || user?.profileImageUrl,
    MENU_ITEM,
  }
}

export default useEditCastingForm
