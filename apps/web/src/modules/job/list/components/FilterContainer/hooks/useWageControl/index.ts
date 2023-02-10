import React from 'react'
import { useEffect } from 'react'

const useWageControl = () => {
  const [wage, setWage] = React.useState<Number | null>(null)
  const [deviant, setDeviant] = React.useState<Number | null>(null)

  useEffect(() => {
    if (wage !== null) {
      if (wage >= 0) {
        setWage(wage)
      } else {
        setWage(-wage)
      }
    }
  }, [wage])

  useEffect(() => {
    if (deviant !== null) {
      if (deviant >= 0) {
        setDeviant(deviant)
      } else {
        setDeviant(-deviant)
      }
    }
  }, [deviant])

  return { wage, setWage, deviant, setDeviant }
}

export default useWageControl
