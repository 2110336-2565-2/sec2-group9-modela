import { GetJobDto, GetResumesDto, ResumeDto, ResumeIdDto } from '@modela/dtos'
import { useSnackbar } from 'common/context/SnackbarContext'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import React from 'react'
import { useCallback, useEffect, useState } from 'react'

const useResume = () => {
  const router = useRouter()
  const { jobId } = router.query
  const { handleError } = useErrorHandler()
  const [loading, setLoading] = useState(false)
  const [jobTitle, setJobTitle] = useState('')
  const { displaySnackbar } = useSnackbar()

  const [Id, setId] = React.useState<number | undefined>()

  const handleSuccess = useCallback(async () => {
    setLoading(true)
    try {
      const resumeIdBody: ResumeIdDto = {
        resumeId: Id!,
      }
      await apiClient.post('jobs/' + jobId + '/apply', resumeIdBody)
      displaySnackbar('การสมัครเสร็จสิ้น', 'success')
      router.push('/job', undefined, { shallow: true })
    } catch (err) {
      handleError(err)
    } finally {
      setLoading(false)
    }
  }, [Id, displaySnackbar, handleError, jobId, router])

  const [resumes, setResumes] = React.useState<ResumeDto[]>([])
  //fetch job title
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = (await apiClient.get<GetJobDto>('/jobs/' + jobId)).data
        setJobTitle(res.title)
        const resResume = (await apiClient.get<GetResumesDto>('/resumes')).data
        setResumes(resResume.resumes)
      } catch (err) {
        handleError(err)
      }
    }
    if (router.isReady) {
      fetchData()
    }
  }, [handleError, jobId, router.isReady])

  return {
    jobId,
    jobTitle,
    handleSuccess,
    loading,
    resumes,
    Id,
    setId,
  }
}

export default useResume
