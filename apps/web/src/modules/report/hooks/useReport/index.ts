import { zodResolver } from '@hookform/resolvers/zod'
import { GetJobDto, PostReportDTO } from '@modela/dtos'
import { useNotification } from 'common/context/NotificationContext'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import {
  FormEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { IReportSchemaType, ReportSchema } from './schema'

const useReport = () => {
  const router = useRouter()
  const { jid } = router.query
  const [loading, setLoading] = useState(false)
  const [jobName, setJobName] = useState('')
  const { displayNotification } = useNotification()
  const { control, handleSubmit } = useForm<IReportSchemaType>({
    criteriaMode: 'all',
    resolver: zodResolver(ReportSchema),
    defaultValues: {
      description: '',
    },
  })

  const handleSuccess: SubmitHandler<IReportSchemaType> = useCallback(
    async (data) => {
      setLoading(true)
      try {
        const postBody: PostReportDTO = {
          reason: data.description,
        }
        await apiClient.post('report/job/' + jid, postBody)
        displayNotification(
          'ขอบคุณที่แจ้งปัญหา ทางทีมงานจะดำเนินการตรวจสอบต่อไป',
          'success',
        )
        router.push('/job', undefined, { shallow: true })
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    },
    [router],
  )

  const handleClickSubmit: FormEventHandler<HTMLFormElement> = useMemo(
    () => handleSubmit(handleSuccess),
    [handleSubmit, handleSuccess],
  )

  //fetch job title
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = (await apiClient.get<GetJobDto>('/job/' + jid)).data
        setJobName(res.title)
      } catch (e) {
        console.log(e)
      }
    }
    if (router.isReady) {
      fetchData()
    }
  }, [jid])

  return {
    jid,
    jobName,
    control,
    handleClickSubmit,
    loading,
  }
}

export default useReport
