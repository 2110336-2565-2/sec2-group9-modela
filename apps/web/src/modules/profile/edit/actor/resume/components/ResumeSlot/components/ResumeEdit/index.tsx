import { Button, CircularProgress } from '@mui/material'
import TextField from 'common/components/TextField'
import UploadFile from 'common/components/UploadFile'

import useResumeForm from './hooks/useResumeForm'
import {
  ButtonAndFileContainer,
  ButtonContainer,
  FileUploadContainer,
  RootContainer,
} from './styled'
import { IResumeEditProps } from './types'

const ResumeEdit = (props: IResumeEditProps) => {
  const {
    name,
    resumeUrl,
    handleCancel,
    handleSubmit,
    resumeId,
    changeToView,
  } = props

  const {
    isLoading,
    fileUrl,
    handleSelectFile,
    resumeName,
    handleChangeName,
    error,
    handleSave,
  } = useResumeForm(name, resumeUrl, resumeId, handleSubmit, changeToView)

  return (
    <RootContainer>
      <TextField
        fullWidth
        placeholder="ชื่อ Resume"
        helperText={error.resumeName}
        error={!!error.resumeName}
        value={resumeName}
        onChange={handleChangeName}
      />
      <ButtonAndFileContainer>
        <FileUploadContainer>
          <UploadFile
            error={!!error['file']}
            errorMessage={error['file']}
            handleSelectFile={handleSelectFile}
            label="อัปโหลดเรซูเม่"
            url={fileUrl}
            initialName={fileUrl && 'ดูเรซูเม่'}
            sx={{ alignItems: 'start' }}
          />
        </FileUploadContainer>
        {isLoading ? (
          <CircularProgress color="primary" />
        ) : (
          <ButtonContainer>
            <Button
              color="error"
              variant="text"
              onClick={handleCancel}
              sx={{ padding: 0 }}
            >
              ยกเลิก
            </Button>
            <Button
              color="success"
              variant="text"
              sx={{ padding: 0 }}
              onClick={handleSave}
            >
              บันทึก
            </Button>
          </ButtonContainer>
        )}
      </ButtonAndFileContainer>
    </RootContainer>
  )
}

export default ResumeEdit
