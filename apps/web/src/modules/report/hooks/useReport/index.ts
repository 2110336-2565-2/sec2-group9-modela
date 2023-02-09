import { zodResolver } from '@hookform/resolvers/zod'
import { GetJobDto } from '@modela/dtos'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import React, {
  FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { IReportSchemaType, ReportSchema } from './schema'

const useReport = () => {
  const router = useRouter()
  const { jid } = router.query
  const [showNoti, setShowNoti] = useState(false)
  const [loading, setLoading] = useState(false)
  const [jobName, setJobName] = useState('')
  const { control, handleSubmit } = useForm<IReportSchemaType>({
    criteriaMode: 'all',
    resolver: zodResolver(ReportSchema),
    defaultValues: {
      description: '',
    },
  })

  const handleSuccess: SubmitHandler<IReportSchemaType> = useCallback(
    async ({ ...data }) => {
      try {
        const postBody = {
          reason: data.description,
        }
        setLoading(true)
        await apiClient.post('report/job/' + jid, postBody)
        //add setTimeout since I don't know if we can make Snackbar persist after redirect
        setShowNoti(true)
        setTimeout(() => router.push('/job'), 1000)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    },
    [router],
  )
  const closeNoti = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return
    setShowNoti(false)
  }

  const handleClickSubmit: FormEventHandler<HTMLFormElement> =
    handleSubmit(handleSuccess)

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
    showNoti,
    closeNoti,
  }
}

export default useReport
