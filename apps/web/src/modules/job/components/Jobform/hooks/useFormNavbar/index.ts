import useBackNavbar from 'common/hooks/useBackNavbar'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'

const useFormNavbar = (edit?: boolean) => {
  const router = useRouter()
  const handleBack = useCallback(() => router.push('/job'), [router])
  useBackNavbar(
    useMemo(
      () => ({
        title: edit ? 'แก้ไขงาน' : 'สร้างงาน',
        onBack: handleBack,
      }),
      [edit, handleBack],
    ),
  )
}

export default useFormNavbar
