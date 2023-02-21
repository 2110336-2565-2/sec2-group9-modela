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

export const CheckedFile = () => {
  return UploadedFile(
    new ParseFilePipe({
      fileIsRequired: true,
      validators: [
        new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
        new FileTypeValidator({ fileType: '(application/pdf|image/*)' }),
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
