import { zodResolver } from '@hookform/resolvers/zod'
import { GetJobDto } from '@modela/dtos'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import { FormEventHandler, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { IReportSchemaType, ReportSchema } from './schema'

const useReport = () => {
  const router = useRouter()
  const { jid } = router.query
  const [jobName, setJobName] = useState<string>('')
  const { control, handleSubmit } = useForm<IReportSchemaType>({
    criteriaMode: 'all',
    resolver: zodResolver(ReportSchema),
    defaultValues: {
      description: '',
    },
  })
  const handleSuccess = () => {
    console.log('success')
  }
  const handleClickSubmit: FormEventHandler<HTMLFormElement> =
    handleSubmit(handleSuccess)

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

  return { jid, jobName, control, handleClickSubmit }
}

export default useReport
