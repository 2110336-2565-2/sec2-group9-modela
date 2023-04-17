import ResumeEdit from './components/ResumeEdit'
import ResumeView from './components/ResumeView'
import useResumeSlot from './hooks/useResumeSlot'
import { ResumeSlotContainer } from './styled'
import { IResumeSlotProps } from './types'

const ResumeSlot = (props: IResumeSlotProps) => {
  const {
    resumeId,
    handleDelete,
    handleCancel,
    handleSubmit,
    isFirst,
    name,
    resumeUrl,
  } = props
  const { changeToEdit, changeToView, handleCancelWithChanging, isEdit } =
    useResumeSlot(!!isFirst, resumeId, handleCancel)

  return (
    <ResumeSlotContainer>
      {!isEdit ? (
        <ResumeView
          name={name}
          resumeUrl={resumeUrl}
          handleDelete={() => handleDelete(resumeId)}
          handleToggleEdit={changeToEdit}
        />
      ) : (
        <ResumeEdit
          name={name}
          resumeUrl={resumeUrl}
          resumeId={resumeId}
          handleCancel={handleCancelWithChanging}
          handleSubmit={handleSubmit}
          changeToView={changeToView}
        />
      )}
    </ResumeSlotContainer>
  )
}

export default ResumeSlot
