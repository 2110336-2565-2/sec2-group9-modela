import { ApiProperty } from '@nestjs/swagger'
import { Actor, Casting, Gender, User } from '@prisma/client'

export class SignupActorDTO implements Partial<Actor & User> {
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

export class SignupCastingDTO implements Partial<Casting & User> {
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
  companyId: string

  @ApiProperty()
  companyName: string

  @ApiProperty()
  employmentCertUrl: string
}

export class LoginDTO implements Partial<User> {
  @ApiProperty()
  email: string

  @ApiProperty()
  password: string
}
