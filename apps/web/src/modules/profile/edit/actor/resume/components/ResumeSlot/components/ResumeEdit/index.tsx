import { Button } from '@mui/material'
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
  const { name, resumeUrl, handleCancel, resumeId } = props
  const { fileName, fileUrl, handleSelectFile, resumeName, setResumeName } =
    useResumeForm(name, resumeUrl)

  return (
    <RootContainer>
      <TextField
        fullWidth
        placeholder="ชื่อ Resume"
        value={resumeName}
        onChange={(el) => setResumeName(el.target.value)}
      />
      <ButtonAndFileContainer>
        <FileUploadContainer>
          <UploadFile
            error={false}
            handleSelectFile={handleSelectFile}
            label="อัปโหลดเรซูเม่"
            url={fileUrl}
            initialName={fileName}
            sx={{ alignItems: 'start' }}
          />
        </FileUploadContainer>
        <ButtonContainer>
          <Button
            color="error"
            variant="text"
            onClick={() => handleCancel?.(resumeId)}
            sx={{ padding: 0 }}
          >
            ยกเลิก
          </Button>
          <Button color="success" variant="text" sx={{ padding: 0 }}>
            บันทึก
          </Button>
        </ButtonContainer>
      </ButtonAndFileContainer>
    </RootContainer>
  )
}

export default ResumeEdit
