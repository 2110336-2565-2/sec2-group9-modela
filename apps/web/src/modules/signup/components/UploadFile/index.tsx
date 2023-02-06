import { FileUploadOutlined } from '@mui/icons-material'
import { Button, Link, Typography } from '@mui/material'
import { FieldValues } from 'react-hook-form'

import { useUploadFile } from './hooks/useUploadFile'
import { UploadFileContainer } from './styled'
import { IUploadFileProps } from './types'

const UploadFile = <T extends FieldValues>(props: IUploadFileProps<T>) => {
  const { error, url, errorMessage, setError, handleSelectFile, label } = props
  const { handleUploadFile, name, removeSameFile } = useUploadFile(
    handleSelectFile,
    setError,
  )

  return (
    <UploadFileContainer>
      <Button variant="text" disableRipple component="label">
        <FileUploadOutlined sx={{ marginRight: '4px' }} />
        {label}
        <input
          hidden
          accept="image/*,.pdf"
          type="file"
          onChange={handleUploadFile}
          onClick={(e) => removeSameFile(e)}
        />
      </Button>
      {error && (
        <Typography
          sx={{ textAlign: 'center' }}
          variant="subtitle2"
          color="error"
        >
          {errorMessage}
        </Typography>
      )}
      {name && !error ? (
        <Typography sx={{ textAlign: 'center' }} variant="subtitle2">
          เลือก{' '}
          <Link href={url} variant="subtitle2" fontWeight={600} color="primary">
            {name}
          </Link>{' '}
        </Typography>
      ) : (
        <></>
      )}
    </UploadFileContainer>
  )
}

export default UploadFile
