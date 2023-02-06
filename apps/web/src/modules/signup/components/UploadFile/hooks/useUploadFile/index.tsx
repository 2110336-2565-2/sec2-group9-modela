import { ChangeEvent, MouseEventHandler, useCallback, useState } from 'react'

export const useUploadFile = (setUploadFile: (file: Blob) => void) => {
  const [name, setName] = useState('')

  const handleUploadFile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0]

        setUploadFile(file)
        setName(file.name)
      }
    },
    [setUploadFile],
  )

  const removeSameFile: MouseEventHandler<HTMLInputElement> = useCallback(
    (ev) => {
      ev.currentTarget.value = ''
    },
    [],
  )

  return { name, handleUploadFile, removeSameFile }
}
