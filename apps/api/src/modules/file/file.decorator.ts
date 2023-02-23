import {
  applyDecorators,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiConsumes } from '@nestjs/swagger'

export const CheckedFile = (
  options: {
    fileIsRequired?: boolean
    maxSize?: number
    fileType?: string
  } = {},
) => {
  const {
    fileIsRequired = true,
    maxSize = 5 * 1024 * 1024,
    fileType = '(application/pdf|image/*)',
  } = options
  return UploadedFile(
    new ParseFilePipe({
      fileIsRequired,
      validators: [
        new MaxFileSizeValidator({ maxSize }),
        new FileTypeValidator({ fileType }),
      ],
    }),
  )
}

export const UseFileUpload = () => {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    UseInterceptors(FileInterceptor('file')),
  )
}
