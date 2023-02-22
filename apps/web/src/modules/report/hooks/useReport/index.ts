import { zodResolver } from '@hookform/resolvers/zod'
import { GetJobDto, PostReportDto } from '@modela/dtos'
import { useSnackbar } from 'common/context/SnackbarContext'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
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
  const { handleError } = useErrorHandler()
  const [loading, setLoading] = useState(false)
  const [jobName, setJobName] = useState('')
  const { displaySnackbar } = useSnackbar()
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
        const postBody: PostReportDto = {
          reason: data.description,
        }
        await apiClient.post('report/job/' + jid, postBody)
        displaySnackbar(
          'ขอบคุณที่แจ้งปัญหา ทางทีมงานจะดำเนินการตรวจสอบต่อไป',
          'success',
        )
        router.push('/job', undefined, { shallow: true })
      } catch (err) {
        handleError(err)
      } finally {
        setLoading(false)
      }
    },
    [displaySnackbar, handleError, jid, router],
  )

  const handleClickSubmit: FormEventHandler<HTMLFormElement> = useMemo(
    () => handleSubmit(handleSuccess),
    [handleSubmit, handleSuccess],
  )

  //fetch job title
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = (await apiClient.get<GetJobDto>('/jobs/' + jid)).data
        setJobName(res.title)
      } catch (err) {
        handleError(err)
      }
    }
    if (router.isReady) {
      fetchData()
    }
  }, [handleError, jid, router.isReady])

  return {
    jid,
    jobName,
    control,
    handleClickSubmit,
    loading,
  }
}

export default useReport
