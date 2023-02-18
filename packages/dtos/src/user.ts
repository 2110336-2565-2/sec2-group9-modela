import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Casting, User, UserStatus, UserType } from '@modela/database'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class GetUserDto implements Partial<User & Casting> {
  @ApiProperty()
  firstName: string

  @ApiProperty()
  middleName?: string

  @ApiProperty()
  lastName: string

  @ApiProperty()
  status: UserStatus

  @ApiProperty()
  type: UserType

  @ApiProperty()
  profileImageUrl?: string

  @ApiProperty()
  companyName?: string

  @ApiProperty()
  userId: number
}

export enum UserUpdateVerificationStatus {
  'ACCEPT' = 'ACCEPT',
  'REJECT' = 'REJECT',
}
export class UpdateUserVerificationDto {
  @IsNotEmpty()
  @IsEnum(UserUpdateVerificationStatus)
  @ApiProperty({enum: UserUpdateVerificationStatus})
  status: UserUpdateVerificationStatus

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  reason?: string
}

export class PendingUserDto implements Partial<User & Actor & Casting> {
  @ApiProperty()
  userId: number

  @ApiProperty()
  firstName: string

  @ApiProperty()
  middleName?: string

  @ApiProperty()
  lastName: string

  @ApiProperty()
  type: UserType

  //casting fields
  @ApiProperty()
  companyName?: string

  @ApiProperty()
  companyId?: string;

  @ApiProperty()
  employmentCertUrl?: string;

  //actor fields
  @ApiProperty()
  idCardImageUrl?: string;

  @ApiProperty()
  ssn?: string;
}
