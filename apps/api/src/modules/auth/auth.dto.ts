import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Actor, Casting, Gender, User } from '@prisma/client'
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator'

export class SignupActorDto implements Partial<Actor & User> {
  @ApiProperty()
  email: string

  @ApiProperty()
  password: string

  @ApiProperty()
  firstName: string

  @ApiProperty()
  middleName: string

  @ApiProperty()
  lastName: string

  @ApiProperty()
  prefix: string

  @ApiProperty()
  nationality: string

  @ApiProperty()
  ssn: string

  @ApiProperty()
  gender: Gender

  @ApiProperty()
  phoneNumber: string

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
  middleName: string

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
