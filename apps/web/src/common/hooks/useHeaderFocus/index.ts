import { useEffect } from 'react'

import { useLayout } from '../../context/LayoutContext'
import { HeaderFocus } from '../../context/LayoutContext/types'

const useHeaderFocus = (focus: HeaderFocus) => {
  const { setHeaderFocus } = useLayout()

  useEffect(() => {
    setHeaderFocus(focus)
    return () => {
      setHeaderFocus(null)
    }
  }, [focus, setHeaderFocus])
}

export default useHeaderFocus
