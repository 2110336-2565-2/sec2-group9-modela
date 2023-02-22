import TextField from 'common/components/TextField'
import UploadFile from 'common/components/UploadFile'
import React from 'react'

const ResumeEdit = () => {
  return (
    <div>
      <TextField />
      <div>
        <UploadFile
          error={false}
          handleSelectFile={() => {}}
          label="อัปโหลดเรซูเม่"
        />
      </div>
    </div>
  )
}

export default ResumeEdit
