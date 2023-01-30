import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Actor, Casting, Gender, User } from '@prisma/client'
import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Length,
} from 'class-validator'

export class SignupActorDto implements Partial<Actor & User> {
  @IsEmail()
  @ApiProperty()
  email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  middleName?: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  prefix: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nationality: string

  @IsAlphanumeric()
  @IsNotEmpty()
  @ApiProperty()
  ssn: string

  @IsEnum(Gender)
  @ApiProperty()
  gender: Gender

  @IsPhoneNumber('TH')
  @ApiProperty()
  phoneNumber: string

  @IsUrl()
  @ApiProperty()
  idCardImageUrl: string
}

export class SignupCastingDto implements Partial<Casting & User> {
  @IsEmail()
  @ApiProperty()
  email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  middleName?: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string

  @IsNumberString()
  @Length(13, 13)
  @ApiProperty()
  companyId: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  companyName: string

  @IsUrl()
  @ApiProperty()
  employmentCertUrl: string
}

export class LoginDto implements Partial<User> {
  @ApiProperty()
  email: string

  @ApiProperty()
  password: string
}
