import { useEffect } from 'react'

import { useLayout } from '../../context/LayoutContext'

const useNavbarSearch = (callback: () => void) => {
  const { setOnSearch } = useLayout()

  useEffect(() => {
    setOnSearch(() => callback)
    return () => {
      setOnSearch(null)
    }
  }, [callback, setOnSearch])
}

export default useNavbarSearch
