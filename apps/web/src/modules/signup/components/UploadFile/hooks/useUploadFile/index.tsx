import { ChangeEvent, MouseEventHandler, useCallback, useState } from 'react'
import { FieldValues, Path } from 'react-hook-form/dist/types'

import { IUploadFileProps } from '../../types'

export const useUploadFile = <T extends FieldValues>(
  setUploadFile: (file: Blob) => void,
  setError: IUploadFileProps<T>['setError'],
  fieldName: Path<T>,
) => {
  const [name, setName] = useState('')

  const handleUploadFile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const reader = new FileReader()
        const file = e.target.files[0]

        setUploadFile(file)
        setName(file.name)

        reader.addEventListener('error', () => {
          setError(fieldName, { message: 'เกิดข้อผิดพลาดในการอัพโหลด' })
        })

        reader.readAsDataURL(file)
      }
    },
    [fieldName, setError, setUploadFile],
  )

  const removeSameFile: MouseEventHandler<HTMLInputElement> = useCallback(
    (ev) => {
      ev.currentTarget.value = ''
    },
    [],
  )

  return { name, handleUploadFile, removeSameFile }
}
