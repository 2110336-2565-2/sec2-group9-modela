import { AxiosError } from 'axios'
import { useSnackbar } from 'common/context/SnackbarContext'
import { useCallback } from 'react'

export const useErrorHandler = (
  error: any,
  overrideMessage?: { [key: string]: string },
) => {
  const { displaySnackbar } = useSnackbar()

  const showError = useCallback(
    (message: string) => {
      displaySnackbar(message, 'error')
    },
    [displaySnackbar],
  )

  if (error instanceof AxiosError) {
    if (error.response) {
      const { data, status } = error.response
      if (status === 400) {
        showError?.(overrideMessage?.[400] || 'กรุณากรอกข้อมูลให้ถูกต้อง')
      } else if (status === 401) {
        if (overrideMessage?.[401]) showError?.(overrideMessage?.[401])
        else location.replace('/login')
      } else if (status === 403) {
        showError?.(overrideMessage?.[403] || 'คุณไม่มีสิทธิ์ในการกระทำนี้')
      } else if (status === 404) {
        if (overrideMessage?.[404]) showError?.(overrideMessage?.[404])
        else location.replace('/404')
      } else if (status === 409) {
        showError?.(
          overrideMessage?.[409] || 'เกิดข้อขัดแย้งกับข้อมูลที่มีอยู่',
        )
      } else if (status === 500) {
        if (overrideMessage?.[500]) showError?.(overrideMessage?.[500])
        else location.replace('/500')
      } else {
        location.replace('/500')
      }
      console.log(`${status}: ${JSON.stringify(data)}`)
    } else if (error.request) {
      console.log(error.request)
      location.replace('/500')
    }
  } else {
    console.log(error.message)
    location.replace('/500')
  }
}
