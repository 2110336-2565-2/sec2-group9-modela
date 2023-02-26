import { UploadUrlDto } from '@modela/dtos'
import axios from 'axios'
import { apiClient } from 'common/utils/api'

const getNewFileName = (filename: string) => {
  const suffix = '_' + Math.floor(Math.random() * 100_000_000_000).toString()

  const splitFileName = filename.replaceAll(' ', '_').split('.')
  const len = splitFileName.length

  splitFileName[Math.max(0, len - 2)] += suffix
  return splitFileName.join('.')
}

const uploadFileToS3 = async (file: File) => {
  const filename = getNewFileName(file.name)

  const { publicUrl, signedUrl } = (
    await apiClient.get<UploadUrlDto>('/file/upload', {
      params: {
        filename,
      },
    })
  ).data

  const fileBuffer = await file.arrayBuffer()

  await axios.put(signedUrl, fileBuffer, {
    headers: {
      'Content-Type': file.type,
    },
  })

  return publicUrl
}

export { uploadFileToS3 }
