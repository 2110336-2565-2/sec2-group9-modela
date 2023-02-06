import { useLayout } from 'common/context/LayoutContext'
import { NavbarOverride } from 'common/context/LayoutContext/types'
import { useEffect } from 'react'

const useBackNavbar = (override: NavbarOverride) => {
  const { setOverride } = useLayout()

  useEffect(() => {
    setOverride(override)
    return () => {
      setOverride(null)
    }
  }, [setOverride, override])
}

export default useBackNavbar
