import { Dayjs } from 'dayjs'
import React from 'react'
import { useEffect } from 'react'

interface IFilter {
  startShooting: Dayjs | null
  endShooting: Dayjs | null
  place: String | null
  date: Dayjs | null
  wage: Number | null
  deviant: Number | null
  age: Number | null
  openCheck: boolean
  closeCheck: boolean
  maleCheck: boolean
  femaleCheck: boolean
  otherCheck: boolean
}

const useFilterData = () => {
  const [state, setState] = React.useState<IFilter>({
    startShooting: null,
    endShooting: null,
    place: null,
    date: null,
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
