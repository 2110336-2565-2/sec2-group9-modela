import { useRouter } from 'next/router'

const useJobCard = () => {
  const router = useRouter()
  const viewDetail = (jobId: number) => {
    router.push(`/job/${jobId}`)
  }
  return { viewDetail }
}
export default useJobCard
