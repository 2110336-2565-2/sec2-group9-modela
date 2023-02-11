import { useState } from 'react'

const useMobileStyle = () => {
  const [isFilterShow, setIsFilterShow] = useState(false)
  const closeFilterPage = () => {
    setIsFilterShow(false)
  }
  return { isFilterShow, setIsFilterShow, closeFilterPage }
}

export default useMobileStyle
