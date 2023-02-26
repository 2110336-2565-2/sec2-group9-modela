import { useSnackbar } from 'common/context/SnackbarContext'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'

const useReport = () => {
  const router = useRouter()
  const { displaySnackbar } = useSnackbar()

  const rejectJob = async (id: number) => {
    await apiClient.put('reports/jobs/' + id + '/accept')
    displaySnackbar('ยกเลิกงานเรียบร้อย', 'success')
    router.push('/job')
  }

  const rejectReport = async (id: number) => {
    await apiClient.put('reports/jobs/' + id + '/accept')
    displaySnackbar('ยกเลิกการแจ้งปัญหาเรียบร้อย', 'success')
    router.push('/job')
  }

  return { rejectJob, rejectReport }
}

export default useReport
