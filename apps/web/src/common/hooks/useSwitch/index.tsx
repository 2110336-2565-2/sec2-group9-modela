import { useCallback, useState } from 'react'

const useSwitch = (initialState: boolean = false) => {
  const [isOpen, setOpen] = useState(initialState)

  const open = useCallback(() => setOpen(true), [])
  const close = useCallback(() => setOpen(false), [])
  const toggle = useCallback(() => setOpen((isOpen: boolean) => !isOpen), [])

  return { isOpen, open, close, toggle }
}

export default useSwitch
