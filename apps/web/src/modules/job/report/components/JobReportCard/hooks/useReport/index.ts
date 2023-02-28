import { useSnackbar } from 'common/context/SnackbarContext'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'

const useReport = () => {
  const router = useRouter()
  const { displaySnackbar } = useSnackbar()

  const rejectJob = async (id: number) => {
    try {
      await apiClient.put('reports/jobs/' + id + '/accept')
      displaySnackbar('ยกเลิกงานเรียบร้อย', 'success')
      router.push('/job')
    } catch (err) {
      displaySnackbar('ไม่สามารถยกเลิกงานได้', 'error')
    }
  }

  const rejectReport = async (id: number) => {
    try {
      await apiClient.put('reports/jobs/' + id + '/accept')
      displaySnackbar('ยกเลิกการแจ้งปัญหาเรียบร้อย', 'success')
      router.push('/job')
    } catch (err) {
      displaySnackbar('ไม่สามารถยกเลิกการแจ้งปัญหาได้', 'error')
    }
  }

  return { rejectJob, rejectReport }
}

export default useReport
