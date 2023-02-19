import { Actor, Casting, User, UserType } from '@modela/database'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
} from 'class-validator'

export class EditActorProfileDto implements Partial<User & Actor> {
  @ApiProperty()
  @IsString()
  @IsOptional()
  nickname?: string

  @ApiProperty()
  @IsUrl()
  @IsOptional()
  profileImageUrl?: string

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
  description?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  ethnicity?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  religion?: string

  @ApiProperty()
  @IsPhoneNumber('TH')
  phoneNumber: string

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  birthDate?: Date

  @ApiProperty()
  @IsOptional()
  @IsString()
  bankName?: string

  // I don't know the format so just let it be string
  @ApiProperty()
  @IsOptional()
  @IsString()
  bankAccount?: string
}

export class EditCastingProfileDto implements Partial<User> {
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

export class GetProfileForEditingDto {
  @ApiProperty()
  type: UserType

  @ApiProperty()
  data: EditActorProfileDto | EditCastingProfileDto
}
