import { ChangeEvent, MouseEventHandler, useCallback, useState } from 'react'

const useUploadFile = (
  setUploadFile: (file: File) => void,
  initialName?: string,
) => {
  const [name, setName] = useState(initialName || '')

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

export default useUploadFile
