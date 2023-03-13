import { useSnackbar } from 'common/context/SnackbarContext'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'

const useReport = () => {
  const router = useRouter()
  const { displaySnackbar } = useSnackbar()
  const { handleError } = useErrorHandler()

  const rejectJob = async (id: number) => {
    try {
      await apiClient.put('reports/jobs/' + id + '/accept')
      displaySnackbar('ยกเลิกงานเรียบร้อย', 'success')
      router.push('/job')
    } catch (err) {
      handleError(err)
    }
  }

  const rejectReport = async (id: number) => {
    try {
      await apiClient.put('reports/jobs/' + id + '/reject')
      displaySnackbar('ยกเลิกการแจ้งปัญหาเรียบร้อย', 'success')
      router.push('/job')
    } catch (err) {
      handleError(err)
    }
  }

  return { rejectJob, rejectReport }
}

export default useReport
