import React from 'react'
import { useEffect } from 'react'

import { IFilter } from '../../types'

const useFilterData = () => {
  const [state, setState] = React.useState<IFilter>({
    startDate: null,
    endDate: null,
    location: null,
    startTime: null,
    endTime: null,
    wage: null,
    deviant: null,
    age: null,
    openCheck: true,
    closeCheck: false,
    maleCheck: false,
    femaleCheck: false,
    otherCheck: false,
  })

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
