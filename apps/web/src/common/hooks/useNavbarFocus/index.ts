import { useEffect } from 'react'

import { useLayout } from '../../context/LayoutContext'
import { NavbarFocus } from '../../context/LayoutContext/types'

const useNavbarFocus = (focus: NavbarFocus) => {
  const { setNavbarFocus } = useLayout()

  useEffect(() => {
    setNavbarFocus(focus)
    return () => {
      setNavbarFocus(null)
    }
  }, [focus, setNavbarFocus])
}

export default useNavbarFocus
