import { useState } from 'react'

const useCounter = () => {
  const [count, setCount] = useState(0)

  const countUp = () => {
    setCount((count) => count + 1)
  }

  const countDown = () => {
    setCount((count) => (count > 0 ? count - 1 : 0))
  }

  return { count, countUp, countDown }
}

export default useCounter
