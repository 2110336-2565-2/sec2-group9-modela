import { MouseEvent, useCallback, useState } from 'react'

export const useShowPassword = () => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = useCallback(
    () => setShowPassword((show) => !show),
    [],
  )

  const handleMouseDownPassword = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
    },
    [],
  )

  return { showPassword, handleClickShowPassword, handleMouseDownPassword }
}
