import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsAlphanumeric,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Length,
} from 'class-validator'
import {
  Actor,
  Casting,
  Gender,
  User,
  UserStatus,
  UserType,
} from '@modela/database'

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

export class SignupActorWithFileDto extends SignupActorDto {
  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  file: Express.Multer.File
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

export class SignupCastingWithFileDto extends SignupCastingDto {
  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  file: Express.Multer.File
}

export class LoginDto implements Partial<User> {
  @IsEmail()
  @ApiProperty()
  email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string
}

export class JwtDto implements Partial<User> {
  @IsNumber()
  @ApiProperty()
  userId: number

  @IsEnum({ enum: UserStatus })
  @ApiProperty()
  status: UserStatus

  @IsEnum({ enum: UserType })
  @IsNotEmpty()
  @ApiProperty()
  type: UserType
}
