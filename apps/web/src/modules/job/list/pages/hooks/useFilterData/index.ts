import React from 'react'
import { useEffect } from 'react'

import { IFilter, initialIFilter } from '../../types'

const useFilterData = () => {
  const [state, setState] = React.useState<IFilter>(initialIFilter)

  useEffect(() => {
    if (state.wage !== null) {
      if (state.wage < 0) {
        setState({ ...state, wage: -state.wage })
      }
    }
  }, [state.wage])

  useEffect(() => {
    if (state.deviant !== null) {
      if (state.deviant < 0) {
        setState({ ...state, deviant: -state.deviant })
      }
    }
  }, [state.deviant])

  useEffect(() => {
    if (state.age !== null) {
      if (state.age < 0) {
        setState({ ...state, age: -state.age })
      }
    }
  }, [state.age])

  return { state, setState }
}

export default useFilterData
