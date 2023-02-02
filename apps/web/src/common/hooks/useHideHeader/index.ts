import { useEffect } from 'react'

import { useLayout } from '../../context/LayoutContext'

const useHideHeader = () => {
  const { setHideHeader } = useLayout()

  useEffect(() => {
    setHideHeader(true)
    return () => {
      setHideHeader(false)
    }
  }, [setHideHeader])
}

export default useHideHeader
