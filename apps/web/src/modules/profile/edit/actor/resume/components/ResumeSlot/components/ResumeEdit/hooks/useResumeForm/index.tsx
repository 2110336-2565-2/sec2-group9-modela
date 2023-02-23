import { useCallback, useEffect, useState } from 'react'

export const useResumeForm = (name: string, resumeUrl: string) => {
  const [resumeName, setResumeName] = useState(name)
  const [fileUrl, setFileUrl] = useState(resumeUrl)
  const [fileName, setFileName] = useState<string>('')
  const [, setCurrentFile] = useState<Blob | null>(null)

  const handleSelectFile = useCallback((file: Blob, filename: string) => {
    const tempUrl = URL.createObjectURL(file)
    setCurrentFile(file)
    setFileUrl(tempUrl)
    setFileName(filename)
  }, [])

  useEffect(() => {
    const prev = fileUrl
    return () => {
      URL.revokeObjectURL(prev)
    }
  }, [fileUrl])

  return {
    setResumeName,
    resumeName,
    fileUrl,
    fileName,
    handleSelectFile,
  }
}

export default useResumeForm
