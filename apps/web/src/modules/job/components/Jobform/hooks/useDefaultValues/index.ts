import { GetJobDto } from '@modela/dtos'
import { apiClient } from 'common/utils/api'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { DEFAULT_FORM_VALUES } from '../../constant'

const useDefaultValues = (edit?: boolean) => {
  const router = useRouter()
  const { jobId } = router.query as { jobId: string }

  const [defaultValues, setDefaultValues] = useState(DEFAULT_FORM_VALUES)

  useEffect(() => {
    const fetchPostData = async () => {
      const res = await apiClient.get<GetJobDto>(`/job/${jobId}`)
      const { applicationDeadline, shooting, ...rest } = res.data

      setDefaultValues({
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
    if (edit) fetchPostData()
  }, [edit, jobId])

  return defaultValues
}

export default useDefaultValues
