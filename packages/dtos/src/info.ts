import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger'
import { SignupActorDto } from './auth'

export class ActorInfoDto extends OmitType(SignupActorDto, [
  'email',
  'password',
]) {
  @ApiProperty()
  idCardImageUrl?: string
}

export class ActorInfoWithReasonDto {
  @ApiProperty()
  rejectedReason: string

  @ApiProperty()
  data: ActorInfoDto
}

export class ActorInfoWithFileDto extends OmitType(SignupActorDto, [
  'email',
  'password',
]) {
  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  file?: Express.Multer.File
}
