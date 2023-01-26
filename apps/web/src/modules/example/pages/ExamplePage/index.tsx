import Button from 'modules/example/components/Button'
import React from 'react'

import useCounter from './hooks/useCounter'

const Counter = () => {
  const { count, countUp, countDown } = useCounter()
  return (
    <div>
      {count}
      <Button onClick={countUp} text={'Up'}></Button>
      <Button onClick={countDown} text={'Down'}></Button>
    </div>
  )
}

export default Counter
