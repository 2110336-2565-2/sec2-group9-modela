import { useCallback, useState } from 'react'

const useSwitch = () => {
  const [isOpen, setOpen] = useState(false)

  const open = useCallback(() => setOpen(true), [])
  const close = useCallback(() => setOpen(false), [])
  const toggle = useCallback(() => setOpen((isOpen: boolean) => !isOpen), [])

  return { isOpen, open, close, toggle }
}

export default useSwitch
