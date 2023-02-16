import { useEffect } from 'react'

import { useLayout } from '../../context/LayoutContext'

const useHideNavbar = () => {
  const { setHideNavbar } = useLayout()

  useEffect(() => {
    setHideNavbar(true)
    return () => {
      setHideNavbar(false)
    }
  }, [setHideNavbar])
}

export default useHideNavbar
