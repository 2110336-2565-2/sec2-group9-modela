import { GetJobDto } from '@modela/dtos'
import { apiClient } from 'common/utils/api'
import dayjs from 'dayjs'
import { IPostJobSchemaType } from 'modules/job/components/JobForm/hooks/useJobForm/schema'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const useInitialValues = () => {
  const router = useRouter()
  const { jobId } = router.query as { jobId: string }

  const [initialValues, setInitialValues] = useState<IPostJobSchemaType | null>(
    null,
  )

  useEffect(() => {
    const fetchPostData = async () => {
      if (!router.isReady) return null
      const res = await apiClient.get<GetJobDto>(`/job/${jobId}`)
      const { applicationDeadline, shooting, ...rest } = res.data

      setInitialValues({
        ...rest,
        applicationDeadline: dayjs(applicationDeadline),
        shooting: shooting.map(
          ({ startDate, endDate, startTime, endTime, shootingLocation }) => ({
            startDate: dayjs(startDate),
            endDate: dayjs(endDate),
            startTime: dayjs(startTime),
            endTime: dayjs(endTime),
            shootingLocation,
          }),
        ),
      })
    }
    fetchPostData()
  }, [jobId, router.isReady])

  return initialValues
}

export default useInitialValues
