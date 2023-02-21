import { FileUploadOutlined } from '@mui/icons-material'
import { Button, Link, Typography } from '@mui/material'
import { FC } from 'react'

import useUploadFile from './hooks/useUploadFile'
import { UploadFileContainer } from './styled'
import { IUploadFileProps } from './types'

const UploadFile: FC<IUploadFileProps> = (props) => {
  const { error, url, errorMessage, handleSelectFile, label, hideLink } = props
  const { handleUploadFile, name, removeSameFile } =
    useUploadFile(handleSelectFile)

  return (
    <UploadFileContainer>
      <Button
        variant="text"
        disableRipple
        component="label"
        sx={{ textAlign: 'center' }}
      >
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
