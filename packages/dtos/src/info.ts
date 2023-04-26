import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger'
import { SignupActorDto, SignupCastingDto } from './auth'

export class ActorInfoDto extends OmitType(SignupActorDto, [
  'email',
  'password',
]) {
  @ApiPropertyOptional()
  idCardImageUrl?: string
}

export class ActorInfoWithReasonDto {
  @ApiProperty()
  rejectedReason: string

  @ApiProperty({ type: ActorInfoDto })
  data: ActorInfoDto
}

export class ActorInfoWithFileDto extends OmitType(SignupActorDto, [
  'email',
  'password',
]) {
  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  file?: Express.Multer.File
}

export class CastingInfoDto extends OmitType(SignupCastingDto, [
  'email',
  'password',
]) {
  @ApiProperty()
  employmentCertUrl?: string
}

export class CastingInfoWithReasonDto {
  @ApiProperty()
  rejectedReason: string

  @ApiProperty({ type: CastingInfoDto })
  data: CastingInfoDto
}

export class CastingInfoWithFileDto extends OmitType(SignupCastingDto, [
  'email',
  'password',
]) {
  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  file?: Express.Multer.File
}
