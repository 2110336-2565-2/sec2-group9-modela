import { FileUploadOutlined } from '@mui/icons-material'
import { Button, Link, Typography } from '@mui/material'
import { FC } from 'react'

import { useUploadFile } from './hooks/useUploadFile'
import { UploadFileContainer } from './styled'
import { IUploadFileProps } from './types'

const UploadFile: FC<IUploadFileProps> = (props) => {
  const { error, url, errorMessage, setError, handleSelectFile } = props
  const { handleUploadFile, name, removeSameFile } = useUploadFile(
    handleSelectFile,
    setError,
  )

  return (
    <UploadFileContainer>
      <Button variant="text" disableRipple component="label">
        <FileUploadOutlined sx={{ marginRight: '4px' }} />
        อัปโหลดรูปถ่ายบัตรประชาชน / พาสปอร์ต
        <input
          hidden
          accept="image/*,.pdf"
          type="file"
          onChange={handleUploadFile}
          onClick={(e) => removeSameFile(e)}
        />
      </Button>
      {error && (
        <Typography variant="subtitle2" color="error">
          {errorMessage}
        </Typography>
      )}
      {name && !error ? (
        <Typography variant="subtitle2">
          ไฟล์{' '}
          <Link href={url} variant="subtitle2" fontWeight={600} color="primary">
            {name}
          </Link>{' '}
          อัปโหลดเสร็จสิ้น
        </Typography>
      ) : (
        <></>
      )}
    </UploadFileContainer>
  )
}

export default UploadFile
