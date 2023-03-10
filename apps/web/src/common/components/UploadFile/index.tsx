import { FileUploadOutlined } from '@mui/icons-material'
import { Button, Link, Typography } from '@mui/material'
import { FC } from 'react'

import useUploadFile from './hooks/useUploadFile'
import { UploadFileContainer } from './styled'
import { IUploadFileProps } from './types'

const UploadFile: FC<IUploadFileProps> = (props) => {
  const {
    error,
    url,
    errorMessage,
    handleSelectFile,
    label,
    hideLink,
    initialName,
    sx,
    accept = 'image/*,.pdf',
  } = props
  const { handleUploadFile, name, removeSameFile } = useUploadFile(
    handleSelectFile,
    initialName,
  )

  return (
    <UploadFileContainer sx={sx}>
      <Button
        variant="text"
        disableRipple
        component="label"
        sx={{ textAlign: 'center', width: 'fit-content', padding: 0 }}
      >
        <FileUploadOutlined sx={{ marginRight: '4px' }} />
        {label}
        <input
          hidden
          accept={accept}
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
      {name && !hideLink && !error && (
        <Typography sx={{ textAlign: 'center' }} variant="subtitle2">
          <Link
            href={url}
            target="_blank"
            rel="noopener"
            variant="subtitle2"
            fontWeight={600}
            color="primary"
          >
            {name}
          </Link>
        </Typography>
      )}
    </UploadFileContainer>
  )
}

export default UploadFile
