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

  @ApiProperty({ enum: UserStatus })
  status: UserStatus

  @ApiProperty({ enum: UserType })
  type: UserType

  @ApiProperty()
  profileImageUrl?: string

  @ApiProperty()
  companyName?: string

  @ApiProperty()
  userId: number
}

export class UpdateUserStatusDto {
  @IsNotEmpty()
  @IsEnum(UserStatus)
  @ApiProperty({ enum: UserStatus })
  status: UserStatus

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  rejectedReason?: string
}

export class PendingUserDataDto {
  @ApiProperty()
  userId: number

  @ApiProperty()
  firstName: string

  @ApiProperty()
  middleName?: string

  @ApiProperty()
  lastName: string

  @ApiPropertyOptional()
  rejectedReason?: string

  // Casting
  @ApiProperty()
  companyName?: string

  @ApiProperty()
  companyId?: string

  @ApiProperty()
  employmentCertUrl?: string

  // Actor
  @ApiProperty()
  idCardImageUrl?: string

  @ApiProperty()
  ssn?: string
}

export class PendingUserDto {
  @ApiProperty({ enum: UserType })
  type: UserType

  @ApiProperty({ type: PendingUserDataDto })
  data: PendingUserDataDto
}
