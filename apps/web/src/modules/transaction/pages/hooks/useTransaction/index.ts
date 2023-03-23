import { useEffect, useState } from 'react'

export const useTransaction = () => {
  const [selectedJob, setSelectedJob] = useState<number | undefined>()

  useEffect(() => {
    if (selectedJob) {
      console.log('selectedJob', selectedJob)
    }
  }, [selectedJob])
  return {
    selectedJob,
    setSelectedJob,
  }
}
