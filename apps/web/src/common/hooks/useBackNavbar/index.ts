import { NavbarOverride } from 'common/context/LayoutContext/types'
import { useEffect } from 'react'

import { useLayout } from '../../context/LayoutContext'

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
