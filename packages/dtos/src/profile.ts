import { Actor, Casting, User, UserType } from '@modela/database'
import { ApiProperty, refs } from '@nestjs/swagger'
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator'

export class EditUserProfileDto implements Partial<User> {
  @ApiProperty()
  @IsString()
  @IsOptional()
  profileImageUrl?: string

  @ApiProperty()
  @IsPhoneNumber('TH')
  @IsOptional()
  phoneNumber?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  bankName?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  bankAccount?: string
}

export class EditCastingProfileDto extends EditUserProfileDto {}

export class EditActorProfileDto extends EditUserProfileDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  nickname?: string

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  height?: number

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  weight?: number

  @ApiProperty()
  @IsOptional()
  @IsString()
  eyeColor?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  hairColor?: string

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  waist?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  bust?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  hips?: number

  // assume that it is EU format
  @ApiProperty()
  @IsOptional()
  @IsInt()
  shoeSize?: number

  @ApiProperty()
  @IsOptional()
  @IsString()
  skinShade?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  ethnicity?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  religion?: string

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  birthDate?: Date
}

export class GetProfileForEditingDto {
  @ApiProperty({ enum: UserType, example: UserType.ACTOR })
  type: UserType

  @ApiProperty({
    oneOf: refs(EditActorProfileDto, EditCastingProfileDto),
  })
  data: EditActorProfileDto | EditCastingProfileDto
}
