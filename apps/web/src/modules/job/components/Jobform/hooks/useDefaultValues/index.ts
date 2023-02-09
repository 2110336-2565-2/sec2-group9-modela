import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { DEFAULT_FORM_VALUES } from '../../constant'

const useDefaultValues = (edit?: boolean) => {
  const router = useRouter()
  const { jobId } = router.query as { jobId: string }

  const [defaultValues, setDefaultValues] = useState(DEFAULT_FORM_VALUES)

  useEffect(() => {
    const fetchPostData = () => {
      // const res = await apiClient.get<GetJobDto>(`/job/${jobId}`)
      setDefaultValues(DEFAULT_FORM_VALUES)
    }
    if (edit) fetchPostData()
  }, [edit, jobId])

  return defaultValues
}

export default useDefaultValues
