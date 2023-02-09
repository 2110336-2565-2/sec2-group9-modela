import useBackNavbar from 'common/hooks/useBackNavbar'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'

const useFormNavbar = (edit?: boolean) => {
  const router = useRouter()

  const handleBack = useCallback(() => router.push('/job'), [router])
  const override = useMemo(
    () => ({
      title: edit ? 'แก้ไขงาน' : 'สร้างงาน',
      onBack: handleBack,
    }),
    [edit, handleBack],
  )

  useBackNavbar(override)
}

export default useFormNavbar
